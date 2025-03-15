from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from database import startup_db_client, shutdown_db_client, test

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


@app.post("/test")
def test_post():
    try:
        test()
        return {"message": "Record inserted successfully"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@app.on_event("startup")
def on_startup():
    print("Starting up postgres database...")
    startup_db_client()

@app.on_event("shutdown")
def on_shutdown():
    print("Shutting down postgres database...")
    shutdown_db_client()
