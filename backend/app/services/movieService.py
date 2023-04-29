import os
import pandas as pd

from typing import List
from datetime import date
from fastapi import HTTPException, Depends
from sqlalchemy.orm import Session
from sqlalchemy import exists, func
from sqlalchemy.exc import SQLAlchemyError
from tmdbv3api import TMDb, Movie
from dotenv import load_dotenv

from app.models.movieSchema import MovieSchema
from app.models.genreSchema import GenreSchema
from app.models.hasGenreSchema import HasGenreSchema
from app.models.movieModel import MovieBase
from app.models.genreModel import GenreBase
from app.models.hasGenreModel import HasGenreBase
from app.models.watchedModel import WatchedModel
from app.models.watchedSchema import WatchedSchema
from app.models.preferencesModel import PreferencesBase
from app.models.preferencesSchema import PreferencesSchema

from app.services.genreService import GenreService
from app.services.hasGenreService import HasGenreService

class MovieService:

    def __init__(self):
        load_dotenv()
        self.tmdb = TMDb()
        self.tmdb.api_key = os.getenv('API_KEY')
        self.tmdb.language = 'fr-FR'
        self.genreService = GenreService()
        self.hasGenreService = HasGenreService()

    def check_if_movie_exist(self, title: str, db: Session):
        doesMovieExist = db.query(exists().where(MovieSchema.title == title)).scalar()
        return doesMovieExist
    
    def check_if_movie_exist_by_id(self, id: int, db: Session):
        doesMovieExist = db.query(exists().where(MovieSchema.id_movie == id)).scalar()
        return doesMovieExist


    def create_movie(self, new_movie: MovieBase, db: Session):
        try:
            if not self.check_if_movie_exist(new_movie.title, db):
                movie_db = MovieSchema(**new_movie.dict())
                db.add(movie_db)
                db.commit()
                return {'result': 'Movie Added'}
            else:
                return {'result': 'Movie not added : Already Present'}
        except SQLAlchemyError as e:
            db.rollback()
            raise HTTPException(status_code=500, detail="An error occured")
        
    def load_movies(self, db: Session, nb_movies_to_load: int):
        try:
            movie = Movie()
            total_pages = nb_movies_to_load // 20
            for page in range(1, total_pages+1):
                popular_movies = movie.popular(page=page)
                for popular_movie in popular_movies:
                    m = movie.details(popular_movie['id'])
                    if not (isinstance(m['release_date'], date)) :
                        m['release_date'] = 0
                    movie_db = MovieBase(id_movie=m['id'], original_title=m['original_title'], \
                                           title=m['title'], language=m['original_language'], \
                                           popularity=m['popularity'], poster_path=m['poster_path'], \
                                           release_date=m['release_date'], runtime=m['runtime'], \
                                           vote_average=m['vote_average'], vote_count=m['vote_count'], \
                                           overview=m['overview'])
                    self.create_movie(movie_db, db)
                    for genre in m['genres']:
                        genre_db = GenreBase(id_genre=genre['id'], genre_name=genre['name'])
                        self.genreService.create_genre(genre_db, db)

                        has_genre_db = HasGenreBase(id_genre=genre['id'], id_movie=m['id'])
                        self.hasGenreService.create_has_genre(has_genre_db, db)
            return {'result': 'Movies Added'}
        except SQLAlchemyError as e:
            db.rollback()
            raise HTTPException(status_code=500, detail="An error occured")
        
    
    def get_movie_by_id(self, id: int, db: Session):
        movie = db.query(MovieSchema).filter_by(id_movie=id).firts()
        pydantic_movie = MovieBase.from_orm(movie)
        return pydantic_movie
    
    def get_movies_from_id_list(self, id_list: List[int], db: Session):
        movies = db.query(MovieSchema).filter(MovieSchema.id_movie.in_(id_list)).all()
        pydantic_movies = [MovieBase.from_orm(movie) for movie in movies]
        return pydantic_movies
    
    def get_watched_movie_ids_by_user(self, id_user: int, db: Session):
        watched_movies = db.query(WatchedSchema).filter_by(id_user=id_user).all()
        watched_movies_ids = [watched_movie.id_movie for watched_movie in watched_movies]
        return watched_movies_ids
    
    def get_preferred_genres_names_by_user(self, id_user: int, db: Session):
        preferred_genres = db.query(GenreSchema.genre_name) \
                .join(PreferencesSchema) \
                .filter(PreferencesSchema.id_user == id_user) \
                .all()
        preferred_genres_names = [genre[0] for genre in preferred_genres]
        return preferred_genres_names
        

    def create_df_from_db(db: Session):
        movie_query = db.query(MovieSchema.id_movie, func.concat("[", func.group_concat("'"+GenreSchema.genre_name+"'"), "]").label('genres'), MovieSchema.popularity) \
            .join(HasGenreSchema, MovieSchema.id_movie == HasGenreSchema.id_movie) \
            .join(GenreSchema, GenreSchema.id_genre == HasGenreSchema.id_genre) \
            .group_by(MovieSchema.id_movie)
        
        df = pd.read_sql(movie_query.statement, movie_query.session.bind)
        df.columns = ['id', 'genres', 'popularity']
        return df