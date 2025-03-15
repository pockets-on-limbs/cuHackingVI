from google import genai
from dotenv import dotenv_values

config = dotenv_values(".env")
my_key = config.get("GEMINI_API_KEY")

client = genai.Client(api_key=my_key)

myfile = client.files.upload(file='media/love.mp3')
prompt = "Use the speech from this file to rate the user's feelings about the song they are listening to on a scale of 1 to 10. Be sure to consider both the content of the speech and the tone of voice when determining the rating. Only print the integer you'd rate it, don't print any other text."

response = client.models.generate_content(
  model='gemini-2.0-flash',
  contents=[prompt, myfile]
)

print(response.text)