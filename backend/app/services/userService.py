from typing import List
from fastapi import HTTPException
from app.models.userModel import UserBase, User
from app.models.userSchema import UserSchema
from app.models.preferencesSchema import PreferencesSchema
from sqlalchemy.orm import Session
from sqlalchemy import exists
from sqlalchemy.exc import SQLAlchemyError

from app.models.genresModel import GenresBase
from app.models.preferencesModel import PreferenceBase
from app.models.genresSchema import GenresSchema

class UserService:
    """
        Service used for the user actions
    """

    def get_user_by_email(self, email : str, db : Session):
        item = db.query(UserSchema).filter_by(email=email).first()
        if item:
            pydantic_user = UserBase.from_orm(item)
            return pydantic_user
        return None

    def get_user(self, username: str, db : Session):
        item = db.query(UserSchema).filter_by(username=username).first()
        pydantic_user = UserBase.from_orm(item)
        return pydantic_user
    
    def get_user_by_id(self, id : int, db : Session):
        item = db.query(UserSchema).filter_by(id_user=id).first()
        pydantic_user = UserBase.from_orm(item)
        return pydantic_user
    
    def get_all_users(self, db : Session):
        try : 
            users = db.query(UserSchema).all()
            if users : 
                return users
            else : 
                raise HTTPException(status_code=404, detail="This user does not exist")
        except SQLAlchemyError as e:
            raise HTTPException(status_code=500, detail="An error occured")

    def checkIfExists(self, email : str, db : Session):
        doesExist = db.query(exists().where(UserSchema.email == email)).scalar()
        return doesExist
    
    def checkIfExistsById(self, id : int, db : Session):
        doesExist = db.query(exists().where(UserSchema.id_user == id)).scalar()
        return doesExist

    def createUser(self, new_user : UserBase, db : Session):
        try:
            if not self.checkIfExists(new_user.email, db) :
                user_db = UserSchema(**new_user.dict())
                db.add(user_db)
                db.commit()
                return {'result' : 'User Created'}
            else:
                raise HTTPException(status_code=404, detail="This user already exist")
        except SQLAlchemyError as e:
            db.rollback()
            raise HTTPException(status_code=500, detail="An error occured")

    def delete_user(self, email : str, db : Session):
        try:
            if self.checkIfExists(email, db) :
                user_db = db.query(UserSchema).filter_by(email=email).first()
                db.delete(user_db)
                db.commit()
                return {'result' : 'User Deleted'}
            else:
                raise HTTPException(status_code=404, detail="This user does not exist")
        except SQLAlchemyError as e:
            db.rollback()
            print(str(e))
            raise HTTPException(status_code=500, detail="An error occured")
        
    def update_user(self, user : UserBase, db : Session):
        try:
            if self.checkIfExists(user.email, db) :
                user_db = db.query(UserSchema).filter_by(email=user.email).first()
                for key, value in user.dict().items():
                    setattr(user_db, key, value)
                db.commit()
                return {'result' : 'User updated'}
            else:
                raise HTTPException(status_code=404, detail="This user does not exist")
        except SQLAlchemyError as e:
            db.rollback()
            print(str(e))
            raise HTTPException(status_code=500, detail="An error occured")
        
    def has_preferences(self, user : UserBase, db : Session):
        try : 
            if self.checkIfExists(user.email, db) :
                user_db = db.query(UserSchema).filter_by(email=user.email).first()
                return (db.query(exists().where(PreferencesSchema.id_user == user_db.id_user)).scalar())
            else:
                raise HTTPException(status_code=404, detail="This user does not exist")
        except SQLAlchemyError as e:
            db.rollback()
            print(str(e))
            raise HTTPException(status_code=500, detail="An error occured")
        
    def has_preferences(self, mail : str, db : Session):
        try : 
            if self.checkIfExists(mail, db) :
                user_db = db.query(UserSchema).filter_by(email=mail).first()
                return (db.query(exists().where(PreferencesSchema.id_user == user_db.id_user)).scalar())
            else:
                raise HTTPException(status_code=404, detail="This user does not exist")
        except SQLAlchemyError as e:
            db.rollback()
            print(str(e))
            raise HTTPException(status_code=500, detail="An error occured")

    def has_preferences_by_id(self, id : int, db : Session):
        try : 
            if self.checkIfExistsById(id, db) :
                user_db = db.query(UserSchema).filter_by(id_user=id).first()
                return (db.query(exists().where(PreferencesSchema.id_user == user_db.id_user)).scalar())
            else:
                raise HTTPException(status_code=404, detail="This user does not exist")
        except SQLAlchemyError as e:
            db.rollback()
            print(str(e))
            raise HTTPException(status_code=500, detail="An error occured")
    
    def check_if_genre_exist(self, id : int, db : Session):
        doesExist = db.query(exists().where(GenresSchema.id_genre == id)).scalar()
        return doesExist
    
    def set_preferences(self, mail : str, genres : List[GenresBase], db : Session):
        try : 
            nb_preferences_passed = 0
            nb_preferences_total = 0
            if self.checkIfExists(mail, db) :
                user_db = db.query(UserSchema).filter_by(email=mail).first()
                for genre in genres : 
                    nb_preferences_total = nb_preferences_total + 1
                    if self.check_if_genre_exist(genre.id, db):
                        newPreference = PreferenceBase(id_user = user_db.id_user, id_genre = genre.id)
                        newPreferenceSchema = PreferencesSchema(**newPreference.dict())
                        db.add(newPreferenceSchema)
                        nb_preferences_passed = nb_preferences_passed + 1
                    else : 
                        print("The genre id : " + str(genre.id) + " name : " + str(genre.name) + " does not exist")
                db.commit()
                string_result = str(nb_preferences_passed) + " preferenced created over " + str(nb_preferences_total)    
                return {'result' : string_result}
            else:
                raise HTTPException(status_code=404, detail="This user does not exist")
        except SQLAlchemyError as e:
            db.rollback()
            print(str(e))
            raise HTTPException(status_code=500, detail="An error occured")