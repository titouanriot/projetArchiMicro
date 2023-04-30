from fastapi import HTTPException
from sqlalchemy.orm import Session
from sqlalchemy import exists, func
from sqlalchemy.exc import SQLAlchemyError

from app.models.movieModel import MovieBase
from app.models.movieSchema import MovieSchema
from app.services.movieService import MovieService
from app.services.userService import UserService
from app.models.watchedSchema import WatchedSchema
from app.models.watchedModel import WatchedModel
from app.models.userSchema import UserSchema


class WatchedService : 

    movieService = MovieService()
    userService = UserService()

    def check_if_watched_exists(self, id_user : int, id_movie : int, db : Session):
        doesWatchedExist = db.query(exists().where(WatchedSchema.id_user == id_user, WatchedSchema.id_movie == id_movie)).scalar()
        return doesWatchedExist

    def add_watched_movie(self, new_watched : WatchedModel, db : Session):
        try:
            if (self.movieService.check_if_movie_exist_by_id(new_watched.id_movie, db)):
                if (self.userService.checkIfExistsById(new_watched.id_user, db)):
                    if not (self.check_if_watched_exists(new_watched.id_user, new_watched.id_movie, db)):
                        watched_db = WatchedSchema(**new_watched.dict())
                        db.add(watched_db)
                        db.commit()
                        return {"result" : "Watched Movie Added"}
                    else:
                         return { "result" : "Watched Movie Not Added : Relation already existing"}
                else : 
                    return { "result" : "Watched Movie Not Added : User not existing"}
            else : 
                return { "result" : "Watched Movie Not Added : Movie not existing"}
        except SQLAlchemyError as e:
            db.rollback()
            raise HTTPException(status_code=500, detail="An error occured")
        
    
    def remove_watched_movie(self, to_delete_watched : WatchedModel, db : Session):
        try:
            if (self.check_if_watched_exists(to_delete_watched.id_user, to_delete_watched.id_movie, db)):
                watched_db = db.query(WatchedSchema).filter_by(id_user=to_delete_watched.id_user, id_movie=to_delete_watched.id_movie).first()
                db.delete(watched_db)
                db.commit()
                return {"result" : "Watched Movie Deleted"}
            else:
                    return { "result" : "Watched Movie Not Deleted : Watched Movie not existing"}
        except SQLAlchemyError as e:
            db.rollback()
            raise HTTPException(status_code=500, detail="An error occured")
    
    def has_watched(self, mail : str, db : Session):
        try : 
            if self.userService.checkIfExists(mail, db) :
                user_db = db.query(UserSchema).filter_by(email=mail).first()
                return (db.query(exists().where(WatchedSchema.id_user == user_db.id_user)).scalar())
            else:
                raise HTTPException(status_code=404, detail="This user does not exist")
        except SQLAlchemyError as e:
            db.rollback()
            print(str(e))
            raise HTTPException(status_code=500, detail="An error occured")

    def get_watched(self, mail : str, db : Session):
        try : 
            if self.userService.checkIfExists(mail, db) :
                user_db = db.query(UserSchema).filter_by(email=mail).first()
                if (self.has_watched(mail, db)) : 
                    list_watched = []
                    for watched in db.query(WatchedSchema).filter(WatchedSchema.id_user == user_db.id_user).all():
                        list_watched.append(db.query(MovieSchema).filter(MovieSchema.id_movie == watched.id_movie).first())
                    return list_watched
                else : 
                    return []
            else : 
                raise HTTPException(status_code=404, detail="This user does not exist")
        except SQLAlchemyError as e:
            raise HTTPException(status_code=500, detail="An error occured")
    

