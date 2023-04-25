from pydantic import BaseSettings, Field
import os
from dotenv import load_dotenv
load_dotenv()

class Settings(BaseSettings):
    if 'DATABASE_URL' in os.environ:
        db_url: str = Field(..., env='DATABASE_URL')
    else :
        load_dotenv()
        db_url = "mysql+mysqlconnector://{user}:{password}@127.0.0.1:3306/WatchOurMovieDB".format(
            user=os.getenv('MYSQL_USER'),
            password=os.getenv('MYSQL_PASSWORD'),
        )

settings = Settings()