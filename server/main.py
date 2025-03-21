from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from api import song, gemini, recommendations

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://localhost:5173/",
        "http://localhost:5174",
        "http://localhost:5174/",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def hello_world():
    return "Hello world!"

app.include_router(song.router, prefix="/songs", tags=["songs"])
app.include_router(gemini.router, prefix="/gemini", tags=["gemini"])
app.include_router(recommendations.router, prefix="/recommendations", tags=["recommendations"])

