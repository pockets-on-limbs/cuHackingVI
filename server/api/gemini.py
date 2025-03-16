from fastapi import APIRouter, Depends, File, UploadFile, HTTPException
from google import genai
from dotenv import dotenv_values
from pathlib import Path
from sqlalchemy.orm import Session
from db.session import get_db
from models.song import Song

router = APIRouter()
config = dotenv_values(".env")
my_key = config.get("GEMINI_API_KEY")

client = genai.Client(api_key=my_key)

def get_rating(file) -> str:
  prompt = "Use the speech from this file to rate the user's feelings about the song they are listening to on a scale of 1 to 10. Be sure to consider both the content of the speech and the tone of voice when determining the rating. Only print the integer you'd rate it, don't print any other text."
  response = client.models.generate_content(
    model='gemini-2.0-flash',
    contents=[prompt, file]
  )
  print(response.text) #TODO: delete
  return response.text

UPLOAD_FOLDER = Path("uploads/")
ALLOWED_EXTENSIONS = {"wav", "mp3"}

UPLOAD_FOLDER.mkdir(parents=True, exist_ok=True)

def allowed_file(filename: str) -> bool:
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

@router.put("/{song_id}")
async def upload_file(song_id: str, db: Session = Depends(get_db), file: UploadFile = File(...)):
    if not allowed_file(file.filename):
        raise HTTPException(status_code=400, detail="Only MP3 files are allowed")
    # upload mp3 file containing user feedback
    file_path = UPLOAD_FOLDER / file.filename
    with file_path.open("wb") as f:
        content = await file.read()
        f.write(content)
    # use gemini to rate the song based on user feedback
    fileToRate = client.files.upload(file=file_path)
    rating = get_rating(fileToRate).strip()
    if not rating.isdigit():
        raise HTTPException(status_code=502, detail="Gemini failed to provide a valid rating")
    rating = int(rating)
    if rating < 1 or rating > 10:
        raise HTTPException(status_code=502, detail="Gemini failed to provide a valid rating")
    # find the song that the user is providing feedback on
    song = db.query(Song).filter(Song.songid == song_id).first()
    if song is None:
        raise HTTPException(status_code=404, detail=f"Song {song_id} not found")
    # update the score
    song.score = rating
    db.commit()
    db.refresh(song)

    return "success"