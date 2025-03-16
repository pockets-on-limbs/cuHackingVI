from __future__ import unicode_literals
from fastapi import APIRouter, Depends,HTTPException
from sqlalchemy.orm import Session
from db.session import get_db
from models.song import Song
from schemas.song import SongCreate, SongResponse
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


@router.post("/", response_model=SongResponse)
def create_song(song: SongCreate, db: Session = Depends(get_db)):
    existing_song = db.query(Song).filter(Song.songid == song.songid).first()
    if existing_song:
        raise HTTPException(status_code=400, detail=f"Song with songid {song.songid} already exists")

    db_song = Song(
        songid=song.songid,
        songname=song.songname,
        artist=song.artist,
        album=song.album,
        score=song.score,
    )
    db.add(db_song)
    db.commit()
    db.refresh(db_song)
    return db_song

@router.get("/{song_id}", response_model=SongResponse)
def read_song(song_id: str, db: Session = Depends(get_db)):
    song = db.query(Song).filter(Song.songid == song_id).first()
    if song is None:
        raise HTTPException(status_code=404, detail=f"Song {song_id} not found")
    return song

@router.get("/", response_model=list[SongResponse])
def read_songs(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    return db.query(Song).offset(skip).limit(limit).all()


@router.get("/youtube/")
def get_youtube(song, artist):

    yt_key = youtube_key
    # Build the YouTube API client
    youtube = build('youtube', 'v3', developerKey=yt_key)
    request = youtube.search().list(
        part='snippet',
        q=f"{song} by {artist}",  # Search query
        type='video',  # Search for videos
        maxResults=1  # Number of results to return
    )
    # Execute the request and fetch the response
    response = request.execute()
    if len(response['items']) < 1:
        raise HTTPException(status_code=404, detail=f"Song {song} by artist {artist} not found")
    item = response['items'][0]
    if 'videoId' not in item['id']:
        raise HTTPException(status_code=404, detail=f"Song {song} by artist {artist} not found")
    video_title = item['snippet']['title']
    video_url = f"https://www.youtube.com/watch?v={item['id']['videoId']}"
    print(f"{video_title}: {video_url}")
    
    ydl_opts = {
        'format': 'bestaudio/best',
        'outtmpl': '../audio/%(title)s.%(ext)s',
        'postprocessors': [{
            'key': 'FFmpegExtractAudio',
            'preferredcodec': 'wav',
        }],
    } 
    with yt_dlp.YoutubeDL(ydl_opts) as ydl: 
        ydl.download([video_url])
        stream = ffmpeg.input('output.m4a')
        stream = ffmpeg.output(stream, 'output.wav')

    return video_url
