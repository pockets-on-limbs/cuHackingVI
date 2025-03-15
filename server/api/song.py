from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from typing import List
from db.session import get_db
from schemas.song import Song, SongCreate
import crud.song as crud

router = APIRouter()

@router.post("/", response_model=Song)
def create_song(song: SongCreate, db: Session = Depends(get_db)):
    return crud.create_song(db=db, song=song)

@router.get("/{song_id}", response_model=Song)
def read_song(song_id: str, db: Session = Depends(get_db)):
    db_song = crud.get_song(db, song_id)
    if db_song is None:
        raise HTTPException(status_code=404, detail="Song not found")
    return db_song

@router.get("/", response_model=List[Song])
def read_songs(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    return crud.get_songs(db=db, skip=skip, limit=limit)
