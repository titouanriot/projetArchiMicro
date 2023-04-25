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
        pydantic_user = UserBase.from_orm(item)
    
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
            return {'result' : 'An error occured'}
