from sqlalchemy.schema import Column, ForeignKey, PrimaryKeyConstraint
from sqlalchemy.types import String, Integer, Boolean, Date
from sqlalchemy.orm import DeclarativeBase

from app.models.userSchema import UserSchema

class Base(DeclarativeBase):
    pass

class GroupSchema(Base):
    __tablename__ = "Groupe"
    id_group = Column(Integer, primary_key=True, index=True)
    group_name = Column(String(100), unique=True)
    owner = Column(Integer, ForeignKey(UserSchema.id_user)) 

class BelongTo(Base):
    __tablename__ = "BelongTo"

    id_user = Column(Integer, ForeignKey(UserSchema.id_user)) 
    id_group = Column(Integer, ForeignKey(GroupSchema.id_group, ondelete="CASCADE")) 

    __table_args__ = (
        PrimaryKeyConstraint(id_user, id_group), {}
    )