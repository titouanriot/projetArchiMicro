from fastapi import HTTPException
from sqlalchemy.orm import Session
from sqlalchemy import exists
from sqlalchemy.exc import SQLAlchemyError

from app.models.hasGenreModel import HasGenreBase
from app.models.hasGenreSchema import HasGenreSchema

class HasGenreService:

    def check_if_has_genre_exist(self, id_movie: int, id_genre: int, db: Session):
        doesHasGenreExist = db.query(exists().where(HasGenreSchema.id_movie == id_movie).where(HasGenreSchema.id_genre == id_genre)).scalar()
        return doesHasGenreExist

    def create_has_genre(self, new_has_genre: HasGenreBase, db: Session):
        try:
            if not (self.check_if_has_genre_exist(new_has_genre.id_movie, new_has_genre.id_genre, db)):       
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
