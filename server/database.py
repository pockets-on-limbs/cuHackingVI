import psycopg2
from psycopg2 import OperationalError
from dotenv import dotenv_values

config = dotenv_values(".env")

def create_connection():
    try:
        connection = psycopg2.connect(
            database=config.get("DB_NAME"),
            user=config.get("DB_USER"),
            password=config.get("DB_PASSWD"),
            host=config.get("DB_HOST"),
            port=config.get("DB_PORT"),
        )
        return connection
    except OperationalError as e:
        print(f"The error '{e}' occurred")
        return None

def test():
    cursor = connection.cursor()
    cursor.execute("INSERT INTO songs (name) VALUES ('test')")
    connection.commit()
    cursor.close()

def startup_db_client():
    global connection
    connection = create_connection()
    if connection:
        print("Database connection established")

def shutdown_db_client():
    if connection:
        connection.close()
        print("Database connection closed")