from fastapi import HTTPException
from sqlalchemy.orm import Session
from sqlalchemy import exists
from sqlalchemy.exc import SQLAlchemyError

from app.models.genreModel import GenreBase
from app.models.genreSchema import GenreSchema

class GenreService:
    """
        Service used for the genres actions
    """
    def check_if_genre_exist(self, id : int, db : Session):
        doesExist = db.query(exists().where(GenreSchema.id_genre == id)).scalar()
        return doesExist
    
    def get_all_genres(self, db : Session):
        try : 
            genres = db.query(GenreSchema).all()
            if genres : 
                return genres
            else : 
                raise HTTPException(status_code=404, detail="Genres do not exist")
        except SQLAlchemyError as e:
            raise HTTPException(status_code=500, detail="An error occured")

    def create_genre(self, new_genre: GenreBase, db: Session):
        try:
            if not self.check_if_genre_exist(new_genre.id_genre, db):
                genre_db = GenreSchema(**new_genre.dict())
                db.add(genre_db)
                db.commit()
                return {'result': 'Genre Added'}
        except SQLAlchemyError as e:
            db.rollback()
            raise HTTPException(status_code=500, detail="An error occured genre")
