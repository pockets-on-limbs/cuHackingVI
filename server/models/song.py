from sqlalchemy import Column, Integer, String
from sqlalchemy.ext.declarative import declarative_base

Base = declarative_base()

class Song(Base):
    __tablename__ = "songs"

    id = Column(Integer, primary_key=True, index=True)
    songid = Column(String, unique=True, index=True)
    songname = Column(String, index=True)
    artist = Column(String)
    album = Column(String, nullable=True)
    score = Column(Integer, default=-1)
