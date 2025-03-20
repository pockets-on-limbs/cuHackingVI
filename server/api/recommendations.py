from fastapi import APIRouter

router = APIRouter()


@router.get("/")
def get_recommendations():
    return [
        "3uRDclNwlzfIXs0H96c75V",
        "4Z3svl0qp99PtkIvfcm2Ny",
        "5Lupo5HZ2XVeUYaiapyWGC",
        "5UFYbXgRJ6bl5ObWesiUBb",
        "1SOTqkhpIWoLX1AS9Y2RpU",
        "1Ub6VfiTXgyV8HnsfzrZzC",
        "3yE11TVHTA8weMp7nTstrM",
        "2PXnV9PBUGW4v5u6WJpCjG",
        "0F4gMsrfiEmcoRiYasnVmQ",
        "7BGZ27yeaKR5OZOIxyegZi",
        "4d9L9pBJNGmHMKs36RgP4e",
        "2nOQ1oLbtnIQGC77yKLEON",
        "6DlPa2rrVK3BygXJ48WYo3",
        "3BSPKTravgBDjmuG1rIXvw",
        "7w8rpLhSxXKhHEM3iFjU9G",
        "5U8yCI4bgKk2qfGz2hJPU5",
        "7fVlbM9hxmv3Omz4UPcsy8",
        "1vAyIchPP5kKfsKGsqZp5M",
        "2IH1AphdouzioYKhoUWRJr",
        "0L0DM33NAe6PjQ1BB4cEjJ",
        "5gHMAfnMIJzi2s3SiVeWiq",
        "4Lh9y6lykMrLL3MBhx0CeO",
        "5r5w80s90PNNWnAVZsAhSb"
    ]