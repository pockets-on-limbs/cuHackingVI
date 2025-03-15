from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from api import song

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://localhost:5173/",
    ],
    allow_credentials=True,
    allow_methods=["GET", "POST"],
    allow_headers=["*"],
)

@app.get("/")
def hello_world():
    return "Hello world!"

app.include_router(song.router, prefix="/songs", tags=["songs"])

