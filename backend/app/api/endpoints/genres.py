from fastapi import APIRouter, Body, Depends, HTTPException, status
from app.database import SessionLocal
from sqlalchemy.orm import Session
from urllib.parse import unquote
from app.models.genresModel import GenresBase
from app.services.genresService import GenreService


router = APIRouter(
    prefix='/genres',
    tags = ['genres']
)

genresService = GenreService()

def get_db():
    db = SessionLocal()
    try : 
        yield db
    finally :
        db.close()


@router.get("/get_all")
async def get_all_genres(db : Session = Depends(get_db)):
    return genresService.get_all_genres(db)