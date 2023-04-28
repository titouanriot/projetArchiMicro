from fastapi import APIRouter, Depends, HTTPException
from app.database import SessionLocal
from sqlalchemy.orm import Session
from typing import List

from app.recommendation_model.recommend import recommend_movies as rm
from app.services.movieService import MovieService
from app.models.watchedModel import WatchedModel
from app.services.watchedService import WatchedService

router = APIRouter(
    prefix='/movie',
    tags = ['movie']
)

movieService = MovieService()
watchedService = WatchedService()

def get_db():
    db = SessionLocal()
    try : 
        yield db
    finally :
        db.close()

@router.put("/load_movies")
async def load_movies(db: Session = Depends(get_db)):
    return movieService.load_movies(db, 20)


@router.post("/add_watched_movie")
async def add_watched_movie(new_watched : WatchedModel, db: Session = Depends(get_db)):
    return watchedService.add_watched_movie(new_watched, db)


# récupérer liste de films vus par l'utilisateur
# récupérer genre de films vus par l'utilsateur
@router.get("/recommend_movies")
async def recommend_movies(db: Session = Depends(get_db)):
    movie_lists = [[76600], [76600, 640146], [640146]] ## groupe d'utilisateurs
    genre_lists = [['Drame']] ##idem
    recommend_movies = rm(movie_lists, genre_lists, db)
    print(recommend_movies)
    return recommend_movies.to_dict(orient='records')