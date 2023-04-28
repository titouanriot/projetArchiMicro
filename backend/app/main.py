from fastapi import FastAPI
from app.api.endpoints import user, movie
from fastapi.middleware.cors import CORSMiddleware
import uvicorn


from app.database import engine
from app.models import userSchema, preferencesSchema, movieSchema, hasGenreSchema, genreSchema
app = FastAPI()

app.include_router(user.router)
app.include_router(movie.router)

userSchema.Base.metadata.create_all(bind=engine)
preferencesSchema.Base.metadata.create_all(bind=engine)
movieSchema.Base.metadata.create_all(bind=engine)
hasGenreSchema.Base.metadata.create_all(bind=engine)
genreSchema.Base.metadata.create_all(bind=engine)

origins = [
    "http://localhost",
    "http://localhost:4200",
    "http://localhost:8080"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins = origins,
    allow_methods = ["*"],
    allow_headers=["*"]
)

@app.get("/")
async def root():
    """
        Get the Root of the project
    """
    return {"title": "Welcome on WatchOurMovie API",
            "Informations" : "Please check the following content to know how to use the different functionalities of the app",
            "Access to the Docs" : "http://localhost/docs",
            }



if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
