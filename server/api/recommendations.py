from fastapi import APIRouter

router = APIRouter()


@router.get("/")
def get_recommendations():
    return ["yay it works"] # return list of songids
