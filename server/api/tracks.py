from __future__ import unicode_literals
import requests
from typing import List
from fastapi import APIRouter
from pathlib import Path
from fastapi.responses import StreamingResponse
from openai import OpenAI
from dotenv import load_dotenv
from googleapiclient.discovery import build
import yt_dlp
import ffmpeg
import zipfile
import io
import os

size = "100"
seeds = ["6D44ttYlLo965aYN7MQueT", "0pBMFlAy7mQeUMQKaN4y8x", "0WCiI0ddWiu5F2kSHgfw5S", "5AyL2kgLtTWEu3qO3B9SqK", "0aBKFfdyOD1Ttvgv0cfjjJ"]
config = load_dotenv("../.env")
openai_key = os.getenv("OPENAI_KEY")
youtube_key = os.getenv("YOUTUBE_API_KEY")

router = APIRouter()

@router.post('/recommendations')
async def recommend_songs(seeds: List[str] = seeds, size: int = size):
    print(youtube_key)
    payload = {}
    url = "https://api.reccobeats.com/v1/track/recommendation?size=" + str(size) + "&seeds="
    for seed in seeds:
        url = url + seed + ","
    url = url[:-1]

    headers = {
    'Accept': 'application/json'
    }

    response = requests.request("GET", url, headers=headers, data=payload)
    # print(response.text)
    responseJSON = response.json()
    cleanedJSON = []
    for item in responseJSON['content']:
        if 'popularity' not in item:
            continue
        if item['popularity'] < 50:
            continue
        newItem = {}
        newItem['trackTitle'] = item['trackTitle']
        newItem['artists'] = item['artists']
        cleanedJSON.append(newItem)
    print(cleanedJSON)

    
    client = OpenAI(api_key=openai_key)
    prompt = """You are an AI that processes JSON data.
    Extract the track titles and artist names from the following JSON. 
    output the results into an array, where each entry is in the form \"[track title] by [artist name]\". 
    If a song has multiple artists, the entry should be in the form \"[track title] by [artist name 1] and [artist name 2]\". 
    In your output, don't include any entries where the track title is not in English.
    Only print the array, don't print any other text."""

    clientRes = client.chat.completions.create(
        model="gpt-4o-mini",
        messages=[
            {"role": "system", "content": prompt},
            {"role": "user", "content": f"Here is the JSON data:\n```json\n{str(cleanedJSON)}\n```"}
        ]
    )
    restText = clientRes.choices[0].message.content
    print(restText)

    songsList = restText.split(',')

    yt_key = youtube_key
    # Build the YouTube API client
    youtube = build('youtube', 'v3', developerKey=yt_key)
    print(songsList, "HELLOOOOOOOOO")

    urls = []
    for song in songsList:
        # Example: search for videos related to "python programming"
        request = youtube.search().list(
            part='snippet',
            q=song,  # Search query
            type='video',  # Search for videos
            maxResults=1  # Number of results to return
        )
        # Execute the request and fetch the response
        response = request.execute()
        if len(response['items']) < 1:
            continue
        item = response['items'][0]
        if 'videoId' not in item['id']:
                continue
        video_title = item['snippet']['title']
        video_url = f"https://www.youtube.com/watch?v={item['id']['videoId']}"
        print(f"{video_title}: {video_url}")
        urls.append(video_url)

    ydl_opts = {
        'format': 'bestaudio/best',
        'outtmpl': '../audio/%(title)s.%(ext)s',
        'postprocessors': [{
            'key': 'FFmpegExtractAudio',
            'preferredcodec': 'wav',
        }],
    }
    def download_from_url(url):    
        ydl.download([url])
        stream = ffmpeg.input('output.m4a')
        stream = ffmpeg.output(stream, 'output.wav')

    with yt_dlp.YoutubeDL(ydl_opts) as ydl:
        for url in urls:
            download_from_url(url)

    zip_buffer = io.BytesIO()
    with zipfile.ZipFile(zip_buffer, 'w', zipfile.ZIP_DEFLATED) as zip_file:
        wav_folder = Path("../audio")
        for wav_file in wav_folder.glob("*.wav"):
            zip_file.write(wav_file, arcname=wav_file.name)
    zip_buffer.seek(0) 

    return StreamingResponse(zip_buffer, media_type="application/zip", headers={"Content-Disposition": "attachment; filename=wav_files.zip"})