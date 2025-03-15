from fastapi import APIRouter, Depends
from google import genai
from dotenv import dotenv_values

config = dotenv_values(".env")
my_key = config.get("GEMINI_API_KEY")

client = genai.Client(api_key=my_key)
myfile = client.files.upload(file='media/love.mp3')

def get_rating(file):
  prompt = "Use the speech from this file to rate the user's feelings about the song they are listening to on a scale of 1 to 10. Be sure to consider both the content of the speech and the tone of voice when determining the rating. Only print the integer you'd rate it, don't print any other text."
  response = client.models.generate_content(
    model='gemini-2.0-flash',
    contents=[prompt, file]
  )
  print(response.text)
  return response


@router.put("/{song_id}", response_model=Song)
def change_rating(song_id: str, db: Session = Depends(get_db)):
    rating = int(gem.get_rating(myfile))
    if rating < 1 or rating > 10:
        raise HTTPException(status_code=500, detail="Gemini failed to provide a valid rating")
    return crud.put_rating(db=db, song_id=song_id, rating=rating)