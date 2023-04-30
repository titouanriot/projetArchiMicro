from sqlalchemy import ForeignKey, PrimaryKeyConstraint
from sqlalchemy.schema import Column
from sqlalchemy.types import Integer
from sqlalchemy.orm import DeclarativeBase

from app.models.userSchema import UserSchema
from app.models.groupSchema import GroupSchema

class Base(DeclarativeBase):
    pass

class BelongToSchema(Base):
    __tablename__ = 'BelongTo'
    __table_args__ = (
        PrimaryKeyConstraint('id_user', 'id_group'),
    )
    id_user = Column(Integer, ForeignKey(UserSchema.id_user), nullable=False)
    id_group = Column(Integer, ForeignKey(GroupSchema.id_group), nullable=False)