from fastapi import HTTPException, Depends, status
from app.models.userModel import UserBase, User, UserInfo
from app.models.userSchema import UserSchema
from app.models.groupModel import GroupBase, Group, BelongToBase
from app.models.groupSchema import GroupSchema, BelongTo
from app.models.preferencesSchema import PreferencesSchema
from app.services.userService import UserService
from sqlalchemy.orm import Session
from sqlalchemy import exists
from sqlalchemy.exc import SQLAlchemyError


class GroupService:

    def get_groups_from_member(self, db : Session, user: User):
        if not user:
            raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="User not logged in")

        items = db.query(GroupSchema).join(BelongTo, GroupSchema.id_group == BelongTo.id_group)\
                                     .join(UserSchema, BelongTo.id_user == UserSchema.id_user).filter_by(email=user.email).all()
        pydantic_items = []
        if items:
            for it in items:
                pydantic_items += [Group.from_orm(it)]
            return pydantic_items
        return None

    def get_groups_from_owner(self, db : Session, user: User):
        if not user:
            raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="User not logged in")

        items = db.query(GroupSchema).join(UserSchema, GroupSchema.owner == UserSchema.id_user).filter_by(email=user.email).all()
        pydantic_items = []
        if items:
            for it in items:
                pydantic_items += [Group.from_orm(it)]
            return pydantic_items
        return None

    def get_group_from_id(self, id_group: int, db : Session, user: User):
        if not user:
            raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="User not logged in")

        try:
            if self.checkIfExistsById(id_group, db) :
                group_db = db.query(GroupSchema).filter_by(id_group=id_group).first()
                if not group_db.owner == user.id_user:
                    raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="User logged in is not group owner")

                pydantic_group = Group.from_orm(group_db)
                return pydantic_group

            else:
                raise HTTPException(status_code=404, detail="This group doesnt exist")
        except SQLAlchemyError as e:
            db.rollback()
            raise HTTPException(status_code=500, detail="An error occured : "+str(e))

    def get_group_members_from_id(self, id_group: int, db : Session, user: User):
        if not user:
            raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="User not logged in")

        try:
            if self.checkIfExistsById(id_group, db) :
                group_db = db.query(GroupSchema).filter_by(id_group=id_group).first()
                if not group_db.owner == user.id_user:
                    raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="User logged in is not group owner")

                items = db.query(UserSchema).join(BelongTo, BelongTo.id_user == UserSchema.id_user)\
                                              .join(GroupSchema, GroupSchema.id_group == BelongTo.id_group)\
                                              .filter_by(id_group=group_db.id_group).all()
                pydantic_items = []
                if items:
                    for it in items:
                        pydantic_items += [UserInfo.from_orm(it)]
                    return pydantic_items
                return None
            else:
                raise HTTPException(status_code=404, detail="This group doesnt exist")
        except SQLAlchemyError as e:
            db.rollback()
            raise HTTPException(status_code=500, detail="An error occured : "+str(e))
        
        

    def checkIfExistsById(self, id_group : int, db : Session):
        doesExist = db.query(exists().where(GroupSchema.id_group == id_group)).scalar()
        return doesExist

    def checkIfExists(self, group_name : str, db : Session):
        doesExist = db.query(exists().where(GroupSchema.group_name == group_name)).scalar()
        return doesExist

    def checkIfUserExists(self, email : str, db : Session):
        doesExist = db.query(exists().where(UserSchema.email == email)).scalar()
        return doesExist

    def create_group(self, group_name: str, db : Session, user: User):
        if not user:
            raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="User not logged in")

        new_group = GroupBase(group_name=group_name, owner=user.id_user)

        try:
            if not self.checkIfExists(new_group.group_name, db) :
                group_db = GroupSchema(**new_group.dict())
                db.add(group_db)
                db.commit()
                return {'result' : 'Group Created'}
            else:
                raise HTTPException(status_code=409, detail="This group already exists")
        except SQLAlchemyError as e:
            db.rollback()
            raise HTTPException(status_code=500, detail="An error occured : "+str(e))

        

    def delete_group(self, group_name : str, db : Session, user: User):
        if not user:
            raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="User not logged in")

        try:
            if self.checkIfExists(group_name, db) :
                group_db = db.query(GroupSchema).filter_by(group_name=group_name).first()
                if not group_db.owner == user.id_user:
                    raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="User logged in is not group owner")

                db.delete(group_db)
                db.commit()
                return {'result' : 'Group Deleted'}
            else:
                raise HTTPException(status_code=404, detail="This group does not exist")
        except SQLAlchemyError as e:
            db.rollback()
            raise HTTPException(status_code=500, detail="An error occured : "+str(e))



    def add_user_to_group(self, group_name: str, email: str, db: Session, user: User):
        if not user:
            raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="User not logged in")

        try:
            if self.checkIfExists(group_name, db) :
                group_db = db.query(GroupSchema).filter_by(group_name=group_name).first()
                if not group_db.owner == user.id_user:
                    raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="User logged in is not group owner")
                if not self.checkIfUserExists(email, db):
                    raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="User does not exist")

                user_to_add = UserService.get_user_withid_by_email(email=email, db=db)
                new_belong_to = BelongToBase(id_user=user_to_add.id_user, id_group=group_db.id_group)

                if db.query(exists().where(BelongTo.id_group == new_belong_to.id_group).where(BelongTo.id_user == new_belong_to.id_user)).scalar():
                    raise HTTPException(status_code=status.HTTP_409_CONFLICT, detail="User is already a member of this group")

                db.add(BelongTo(**new_belong_to.dict()))
                db.commit()

                return {'result' : 'User added'}
            else:
                raise HTTPException(status_code=404, detail="This group does not exist")
        except SQLAlchemyError as e:
            db.rollback()
            raise HTTPException(status_code=500, detail="An error occured : "+str(e))