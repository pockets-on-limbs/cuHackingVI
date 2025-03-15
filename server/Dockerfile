FROM python:3.12.7-slim-bookworm AS python-base

WORKDIR /usr/src/app
COPY requirements.txt ./
RUN pip install --upgrade pip
RUN pip install -r requirements.txt
RUN pip install -q -U google-genai
COPY . ./

EXPOSE 8080
CMD ["uvicorn", "main:app", "--reload", "--host", "0.0.0.0", "--port", "8080"]