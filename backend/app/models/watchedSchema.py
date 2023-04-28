from sqlalchemy import ForeignKey, PrimaryKeyConstraint
from sqlalchemy.schema import Column
from sqlalchemy.types import String, Integer, Boolean, Date
from sqlalchemy.orm import DeclarativeBase
from app.models.movieSchema import MovieSchema

from app.models.userSchema import UserSchema

class Base(DeclarativeBase):
    pass

class WatchedSchema(Base):
    __tablename__ = 'Watched'
    __table_args__ = (
        PrimaryKeyConstraint('id_user', 'id_movie'),
    )
    id_user = Column(Integer, ForeignKey(UserSchema.id_user), nullable=False)
    id_movie = Column(Integer, ForeignKey(MovieSchema.id_movie), nullable=False)
    appreciation = Column(Integer)

