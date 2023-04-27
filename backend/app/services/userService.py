from app.models.userModel import UserBase, User
from app.models.userSchema import UserSchema
from sqlalchemy.orm import Session
from sqlalchemy import exists
from sqlalchemy.exc import SQLAlchemyError

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
    
    def get_all_users(self, db : Session):
        try : 
            users = db.query(UserSchema).all()
            if users : 
                return users
            else : 
                return {'result' : 'No user found'}
        except SQLAlchemyError as e:
            return {'result' : 'An error occured'}


    def checkIfExists(self, email : str, db : Session):
        doesExist = db.query(exists().where(UserSchema.email == email)).scalar()
        return doesExist

    def createUser(self, new_user : UserBase, db : Session):
        try:
            if not self.checkIfExists(new_user.email, db) :
                user_db = UserSchema(**new_user.dict())
                db.add(user_db)
                db.commit()
                return {'result' : 'User Created'}
            else:
                return {'Error' : 'This user does already exist'}
        except SQLAlchemyError as e:
            db.rollback()
            return {'Error' : 'An error occured'}
    
    # def createUser(self, new_user : UserBase, db : Session):
    #     try:
    #         if not self.checkIfExists(new_user.email, db) :
    #             user_db = UserSchema(**new_user.dict())
    #             db.add(user_db)
    #             db.commit()
    #             return {'result' : 'User Created'}
    #         else:
    #             return {'Error' : 'This user does already exist'}
    #     except SQLAlchemyError as e:
    #         db.rollback()
    #         return {'result' : 'An error occured'}

    def delete_user(self, email : str, db : Session):
        try:
            if self.checkIfExists(email, db) :
                user_db = db.query(UserSchema).filter_by(email=email).first()
                db.delete(user_db)
                db.commit()
                return {'result' : 'User Deleted'}
            else:
                return {'Error' : 'This user does not exist'}
        except SQLAlchemyError as e:
            db.rollback()
            print(str(e))
            return {'result' : 'An error occured'}
        
    def update_user(self, user : UserBase, db : Session):
        try:
            if self.checkIfExists(user.email, db) :
                user_db = db.query(UserSchema).filter_by(email=user.email).first()
                for key, value in user.dict().items():
                    setattr(user_db, key, value)
                db.commit()
                return {'result' : 'User updated'}
            else:
                return {'Error' : 'This user does not exist'}
        except SQLAlchemyError as e:
            db.rollback()
            print(str(e))
            return {'result' : 'An error occured'}
