from pydantic import BaseModel
from typing import Optional

class SongBase(BaseModel):
    songid: str
    songname: str
    artist: str
    album: Optional[str] = None
    score: int = -1

class SongCreate(SongBase):
    pass

class SongResponse(SongBase):
    id: int

    class Config:
        orm_mode = True
