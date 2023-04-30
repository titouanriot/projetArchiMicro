# WatchOurMovie

Thanks for having download our APP, and we hope you will enjoy to use it and share it to your friends.


## How to deploy the APP in PROD


The app can be deployed using docker following the next steps.
All the configuration files have been created and tested on MacOS 13.3.1 and Windows 10 22H2.
You MUST have a Docker version installed on your machine.
At the root of the project (same location as the docker-compose.yml file), you must create a file called `.env` in which you have to put the different information inside : 

MYSQL_HOST=[host] 

MYSQL_USER=[user]

MYSQL_PASSWORD=[password]

MYSQL_ROOT_PASSWORD=[password]

MYSQL_DATABASE='NameDB'

Note that the host has to bethe name of the mysql container.
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
You need first to create a file '.env' inside the app folder containing :

MYSQL_USER=[user]

MYSQL_PASSWORD=[password]

MYSQL_ROOT_PASSWORD=[password]

API_KEY=[api_key]

SECRET_KEY=[key]

ALGORITHM=[algorithm]


EXAMPLE FOR SECRET_KEY : SECRET_KEY=MYSUPERKEY

EXAMPLE FOR ALGORITHM : ALGORITHM=HS256

To Launch it, go on the backend folder and execute `uvicorn app.main:app --port 8000 --reload` (if you do not have the packages installed, you can start the .venv).
Accessible at `http://localhost:8000`.

TIPS :

Some users are created by default when creating the databse container, to access to an admin profile you can use the following credentials : 
email : bob.smith@example.com
password : letmein123


### Database

Requirements : Mysql Launched with the scripts located in the database folder.

# Contributors

Matthieu Cabrera, cabreramat@cy-tech.fr

Aurélien Carmes, carmesaure@cy-tech.fr

Florian Mounacq, mounacqflo@cy-tech.fr

Titouan Riot, riottitoua@cy-tech.fr