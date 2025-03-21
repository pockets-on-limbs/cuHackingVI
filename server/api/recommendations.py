from fastapi import APIRouter
from savify import Savify
from savify.logger import Logger
from savify.types import Type, Format, Quality
from savify.utils import PathHolder
import requests
import random

# reccobeats get_recommendations API
hard_coded_recs = [
    "3uRDclNwlzfIXs0H96c75V",
    "4Z3svl0qp99PtkIvfcm2Ny",
    "5Lupo5HZ2XVeUYaiapyWGC",
    "5UFYbXgRJ6bl5ObWesiUBb",
    "1SOTqkhpIWoLX1AS9Y2RpU",
    "1Ub6VfiTXgyV8HnsfzrZzC",
    "3yE11TVHTA8weMp7nTstrM",
    "2PXnV9PBUGW4v5u6WJpCjG",
    "0F4gMsrfiEmcoRiYasnVmQ",
    "7BGZ27yeaKR5OZOIxyegZi",
    "4d9L9pBJNGmHMKs36RgP4e",
    "2nOQ1oLbtnIQGC77yKLEON",
    "6DlPa2rrVK3BygXJ48WYo3",
    "3BSPKTravgBDjmuG1rIXvw",
    "7w8rpLhSxXKhHEM3iFjU9G",
    "5U8yCI4bgKk2qfGz2hJPU5",
    "7fVlbM9hxmv3Omz4UPcsy8",
    "1vAyIchPP5kKfsKGsqZp5M",
    "2IH1AphdouzioYKhoUWRJr",
    "0L0DM33NAe6PjQ1BB4cEjJ",
    "5gHMAfnMIJzi2s3SiVeWiq",
    "4Lh9y6lykMrLL3MBhx0CeO",
    "5r5w80s90PNNWnAVZsAhSb"
]

def getRecco():
    payload = {}
    size = "100"
    seeds = ["6D44ttYlLo965aYN7MQueT", "0pBMFlAy7mQeUMQKaN4y8x", "0WCiI0ddWiu5F2kSHgfw5S", "5AyL2kgLtTWEu3qO3B9SqK", "0aBKFfdyOD1Ttvgv0cfjjJ"]

    url = "https://api.reccobeats.com/v1/track/recommendation?size=" + size + "&seeds="
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
        newItem['id'] = item['id']
        newItem['spotifyURL'] = "https://open.spotify.com/track/" + item['id']
        newItem['trackTitle'] = item['trackTitle']
        newItem['artists'] = item['artists']
        cleanedJSON.append(newItem)
    return cleanedJSON

# our endpoint
router = APIRouter()

@router.get("/")
def get_recommendations():
    # reccos = getRecco()
    # trackIDs = []
    # logger = Logger(log_location='path/for/logs', log_level=None) 
    # s = Savify(api_credentials=("SPOTIPY_CLIENT_ID","SPOTIPY_CLIENT_SECRET"), path_holder=PathHolder(downloads_path='../downloads'), logger=logger)
    # print(reccos)
    # # Spotify URL
    # for recco in reccos:
    #     s.download(recco['spotifyURL'])
    #     trackIDs.append(recco['id'])
    # return trackIDs
    # commenting out but leaving here in case my stuff breaks and you need something hardcoded
    
    return random.sample(hard_coded_recs, 5)