from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from db.session import get_db
from models.song import Song
from schemas.song import SongCreate, SongResponse

router = APIRouter()


@router.post("/", response_model=SongResponse)
def create_song(song: SongCreate, db: Session = Depends(get_db)):
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
