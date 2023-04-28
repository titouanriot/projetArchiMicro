from fastapi import APIRouter, Body, Depends, HTTPException, status
from app.database import SessionLocal
from sqlalchemy.orm import Session
from urllib.parse import unquote
from app.models.genreModel import GenreBase
from app.services.genreService import GenreService


router = APIRouter(
    prefix='/genre',
    tags = ['genre']
)

genreService = GenreService()

def get_db():
    db = SessionLocal()
    try : 
        yield db
    finally :
        db.close()


@router.get("/get_all")
async def get_all_genres(db : Session = Depends(get_db)):
    return genreService.get_all_genres(db)