from fastapi import FastAPI
from app.api.endpoints import main
from app.api.endpoints import user
from fastapi.middleware.cors import CORSMiddleware
import uvicorn

from app.database import engine
from app.models import userSchema
app = FastAPI()

app.include_router(main.router)
app.include_router(user.router)

userSchema.Base.metadata.create_all(bind=engine)

origins = [
    "http://localhost"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins = origins,
    allow_methods = ["*"],
    allow_headers=["*"]
)


#change help section
help = [
    { 
        "method" : "POST",
        "path"   : "/api/predict",
        "params" : "Wine params",
        "result" : "get a result of the wine quality sent between 0 and 10"
    },
    { 
        "method" : "GET",
        "path"   : "/api/predict",
        "result" : "get the combination to identify the best wine"
    },
    { 
        "method" : "GET",
        "path" : "/api/model",
        "result" : "get the serialized model"
    },
    { 
        "method" : "GET",
        "path"   : "/api/model/description",
        "result" : "Get Informations about the model used"
    },
    { 
        "method" : "PUT",
        "path"   : "/api/model",
        "params" : "A wine model",
        "result" : "Add an object to the model"
    },
    { 
        "method" : "POST",
        "path"   : "/api/model/retrain",
        "result" : "Train another time the model"
    }
]

@app.get("/")
async def root():
    """
        Get the Root of the project
    """
    return {"title": "Welcome on WatchOurMovie API",
            "Informations" : "Please check the following content to know how to use the different functionalities of the app",
            "Access to the Docs" : "http://localhost/docs",
            "help" : help}

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)