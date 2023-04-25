# WatchOurMovie

Thanks for having download our APP, and we hope you will enjoy to use it and share it to your friends.


## How to deploy the APP in PROD

You MUST have a Docker version installed on your machine.
At the root of the project (same location as the docker-compose.yml file), you must create a file called `.env` in which you have to put the different information inside : 

MYSQL_USER=[USER]

MYSQL_PASSWORD=[password]

MYSQL_ROOT_PASSWORD=[password]

After that, you just got to execute the command `docker-compose up` inside the project.
The app can be accessed at your `http://localhost:8080`.


## How to make developement on the APP

For this part, you'll have to launch in dev mode every part of the app, which are the Database, frontend and backend.

### Frontend

Requirements : NODE.JS with Angular CLI
You need to install the dependencies using `npm install` command in the frontend folder.
You can start the frontend Service with the command `ng serve` in the same folder.

### Backend

Requirements : Python 3.10 with FastAPI, and Uvicorn.
To Launch it, go on the backend folder and execute `uvicorn app.main:app --port 8000` (if you do not have the packages installed, you can start the .venv).
Accessible at `http://localhost:8000`.


### Database

Requirements : Mysql Launched with the scripts located in the database folder.

# Contributors

Matthieu Cabrera, cabreramat@cy-tech.fr

Aurélien Carmes, carmesaure@cy-tech.fr

Florian Mounacq, mounacqflo@cy-tech.fr

Titouan Riot, riottitoua@cy-tech.fr