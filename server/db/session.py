from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from dotenv import dotenv_values

config = dotenv_values(".env")
SQLALCHEMY_DATABASE_URL = f"postgresql://{config.get("DB_USER")}:{config.get("DB_PASSWD")}@{config.get("DB_HOST")}/{config.get("DB_NAME")}"

engine = create_engine(SQLALCHEMY_DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
