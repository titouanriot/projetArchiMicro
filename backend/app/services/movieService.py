from fastapi import HTTPException
from sqlalchemy.orm import Session
from sqlalchemy import exists, func
from sqlalchemy.exc import SQLAlchemyError
from tmdbv3api import TMDb, Movie
import pandas as pd
import os
from dotenv import load_dotenv

from app.models.movieSchema import MovieSchema
from app.models.genreSchema import GenreSchema
from app.models.hasGenreSchema import HasGenreSchema
from app.models.movieModel import MovieBase
from app.models.genreModel import GenreBase
from app.models.hasGenreModel import HasGenreBase


class MovieService:
    load_dotenv()
    api_key = os.getenv('API_KEY')

    tmdb = TMDb()
    tmdb.api_key = api_key
    tmdb.language = 'fr-FR'

    def checkIfMovieExists(self, title: str, db: Session):
        doesMovieExist = db.query(exists().where(MovieSchema.title == title)).scalar()
        return doesMovieExist


    def createMovie(self, new_movie: MovieBase, db: Session):
        try:
            if not self.checkIfMovieExists(new_movie.title, db):
                movie_db = MovieSchema(**new_movie.dict())
                db.add(movie_db)
                db.commit()
                print(self.checkIfMovieExists(new_movie.title, db))
                return {'result': 'Movie Added'}
            else:
                return {'result': 'Movie not added : Already Present'}
        except SQLAlchemyError as e:
            db.rollback()
            raise HTTPException(status_code=500, detail="An error occured")


    def checkIfGenreExists(self, genre_name: str, db: Session):
        doesGenreExist = db.query(exists().where(GenreSchema.genre_name == genre_name)).scalar()
        return doesGenreExist


    def createGenre(self, new_genre: GenreBase, db: Session):
        try:
            if not self.checkIfGenreExists(new_genre.genre_name, db):
                genre_db = GenreSchema(**new_genre.dict())
                db.add(genre_db)
                db.commit()
                return {'result': 'Genre Added'}
        except SQLAlchemyError as e:
            db.rollback()
            raise HTTPException(status_code=500, detail="An error occured genre")


    def checkIfHasGenreExists(self, id_movie: int, id_genre: int, db: Session):
        doesHasGenreExist = db.query(exists().where(HasGenreSchema.id_movie == id_movie).where(HasGenreSchema.id_genre == id_genre)).scalar()
        return doesHasGenreExist


    def createHasGenre(self, new_has_genre: HasGenreBase, db: Session):
        try:
            if not self.checkIfHasGenreExists(new_has_genre.id_movie, new_has_genre.id_genre, db):
                has_genre_db = HasGenreSchema(**new_has_genre.dict())
                db.add(has_genre_db)
                db.commit()
                return {'result': 'Relation HasGenre Created'}
            else:
                return {'result': 'Relation HasGenre Not Created : Already Exist'}
        except SQLAlchemyError as e:
            db.rollback()
            print(str(e))
            raise HTTPException(status_code=500, detail="An error occured has genre")
        
    def load_movies(self, db: Session, nb_movies_to_load: int):
        try:
            movie = Movie()
            total_pages = nb_movies_to_load // 20

            for page in range(1, total_pages+1):
                popular_movies = movie.popular(page=page)
                for popular_movie in popular_movies:
                    m = movie.details(popular_movie['id'])
                    movie_db = MovieBase(id_movie=m['id'], original_title=m['original_title'], \
                                           title=m['title'], language=m['original_language'], \
                                           popularity=m['popularity'], poster_path=m['poster_path'], \
                                           release_date=m['release_date'], runtime=m['runtime'], \
                                           vote_average=m['vote_average'], vote_count=m['vote_count'], \
                                           overview=m['overview'])
                    self.createMovie(movie_db, db)
                    print(self.checkIfMovieExists(movie_db.title, db))

                    for genre in m['genres']:
                        genre_db = GenreBase(id_genre=genre['id'], genre_name=genre['name'])
                        self.createGenre(genre_db, db)

                        has_genre_db = HasGenreBase(id_genre=genre['id'], id_movie=m['id'])
                        print(m['id'])
                        self.createHasGenre(has_genre_db, db)

            return {'result': 'Movies Added'}
        except SQLAlchemyError as e:
            db.rollback()
            raise HTTPException(status_code=500, detail="An error occured")
        

    def create_df_from_db(db: Session):
        movie_query = db.query(MovieSchema.id_movie, func.concat("[", func.group_concat("'"+GenreSchema.genre_name+"'"), "]").label('genres'), MovieSchema.popularity) \
            .join(HasGenreSchema, MovieSchema.id_movie == HasGenreSchema.id_movie) \
            .join(GenreSchema, GenreSchema.id_genre == HasGenreSchema.id_genre) \
            .group_by(MovieSchema.id_movie)
        
        df = pd.read_sql(movie_query.statement, movie_query.session.bind)
        df.columns = ['id', 'genres', 'popularity']

        return df
