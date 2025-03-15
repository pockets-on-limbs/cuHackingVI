from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from dotenv import dotenv_values

config = dotenv_values(".env")
app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "http://localhost:3000/",
    ],
    allow_credentials=True,
    allow_methods=["GET", "POST"],
    allow_headers=["*"],
)

@app.get("/")
def hello_world():
    return "Hello world!"

@app.on_event("startup")
def startup_db_client():
    pass

@app.on_event("shutdown")
def shutdown_db_client():
    pass
