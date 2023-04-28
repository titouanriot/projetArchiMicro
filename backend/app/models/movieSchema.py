from sqlalchemy import PrimaryKeyConstraint
from sqlalchemy.schema import Column
from sqlalchemy.types import String, Integer, Float, Date
from sqlalchemy.orm import DeclarativeBase

class Base(DeclarativeBase):
    pass

class MovieSchema(Base):
    __tablename__ = 'Movie'
    id_movie = Column(Integer, primary_key=True, index=True, nullable=False)
    original_title = Column(String(255), nullable=False)
    title = Column(String(255), nullable=False)
    language = Column(String(255), nullable=False)
    popularity = Column(Float, nullable=False)
    poster_path = Column(String(255), nullable=False)
    release_date = Column(Date, nullable=False)
    runtime = Column(Integer, nullable=False)
    vote_average = Column(Float, nullable=False)
    vote_count = Column(Integer, nullable=False)
    overview = Column(String(255), nullable=False)