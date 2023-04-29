from fastapi import APIRouter, Depends, HTTPException
from app.database import SessionLocal
from sqlalchemy.orm import Session
from typing import List

from app.recommendation_model.recommend import recommend_movies as recommend
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
    return movieService.load_movies(db, 60)

@router.post("/add_watched_movie")
async def add_watched_movie(new_watched : WatchedModel, db: Session = Depends(get_db)):
    return watchedService.add_watched_movie(new_watched, db)

@router.delete("/remove_watched_movie")
async def remove_watched_movie(to_delete_watched : WatchedModel, db: Session = Depends(get_db)):
    return watchedService.remove_watched_movie(to_delete_watched, db)


# récupérer liste de films vus par l'utilisateur
# récupérer genre de films vus par l'utilsateur
@router.get("/user_recommendations/{id_user}")
async def recommend_movies_by_user(id_user: int, db: Session = Depends(get_db)):
    # movie_lists = [[76600], [76600, 640146], [640146]]
    movie_ids_list = [movieService.get_watched_movie_ids_by_user(id_user, db)]
    print(movie_ids_list)
    # genre_lists = [['Drame']]
    genre_names_list = [movieService.get_preferred_genres_names_by_user(id_user, db)]
    print(genre_names_list)
    recommend_movie_ids_list = recommend(movie_ids_list, genre_names_list, db)
    print(recommend_movie_ids_list)
    recommend_movies = movieService.get_movies_from_id_list(recommend_movie_ids_list, db)
    print(recommend_movies)
    return recommend_movies