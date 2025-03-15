from sqlalchemy.orm import Session
import models.song as models
from schemas.song import SongCreate

def create_song(db: Session, song: SongCreate):
    db_song = models.Song(
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

def get_song(db: Session, song_id: str):
    return db.query(models.Song).filter(models.Song.songid == song_id).first()

def get_songs(db: Session, skip: int = 0, limit: int = 100):
    return db.query(models.Song).offset(skip).limit(limit).all()
