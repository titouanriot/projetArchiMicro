from sqlalchemy import ForeignKey, PrimaryKeyConstraint
from sqlalchemy.schema import Column
from sqlalchemy.types import Integer
from sqlalchemy.orm import DeclarativeBase
from app.models.genresSchema import GenresSchema
from app.models.userSchema import UserSchema

class Base(DeclarativeBase):
    pass

class PreferencesSchema(Base):
    __tablename__ = 'Preferences'
    __table_args__ = (
        PrimaryKeyConstraint('id_user', 'id_genre'),
    )
    id_user = Column(Integer, ForeignKey(UserSchema.id_user),nullable=False)
    id_genre = Column(Integer, ForeignKey(GenresSchema.id_genre), nullable=False)
