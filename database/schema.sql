CREATE DATABASE IF NOT EXISTS WatchOurMovieDB;
USE WatchOurMovieDB;

CREATE TABLE IF NOT EXISTS User(
    id_user INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    birth_date DATE NOT NULL,
    password VARCHAR(100) NOT NULL,
    is_user_account_active BOOLEAN NOT NULL DEFAULT TRUE,
    is_admin BOOLEAN NOT NULL DEFAULT FALSE
);

CREATE TABLE IF NOT EXISTS Groupe(
    id_group INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    group_name VARCHAR(100) NOT NULL,
    owner INT NOT NULL,
    CONSTRAINT fk_owner FOREIGN KEY (owner) REFERENCES User(id_user)
);

CREATE TABLE IF NOT EXISTS Movie(
    id_movie INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    original_title VARCHAR(100) NOT NULL,
    title VARCHAR(100) NOT NULL,
    language VARCHAR(100) NOT NULL,
    category VARCHAR(100) NOT NULL,
    poster_path VARCHAR(100) NOT NULL,
    release_date DATE NOT NULL,
    runtime INT NOT NULL,
    vote_average FLOAT NOT NULL,
    vote_count INT NOT NULL,
    overview VARCHAR(1000) NOT NULL
);

CREATE TABLE IF NOT EXISTS Director(
    id_director INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    director_name VARCHAR(100) NOT NULL
);

CREATE TABLE IF NOT EXISTS Genre(
    id_genre INT PRIMARY KEY NOT NULL,
    genre_name VARCHAR(100) NOT NULL
);

CREATE TABLE IF NOT EXISTS BelongTo(
    id_user INT NOT NULL,
    id_group INT NOT NULL,
    CONSTRAINT fk_user_group FOREIGN KEY (id_user) REFERENCES User(id_user),
    CONSTRAINT fk_group_user FOREIGN KEY (id_group) REFERENCES Groupe(id_group) ON DELETE cascade
);

CREATE TABLE IF NOT EXISTS Watched(
    id_user INT NOT NULL,
    id_movie INT NOT NULL,
    appreciation INT NOT NULL,
    CONSTRAINT fk_user_movie FOREIGN KEY (id_user) REFERENCES User(id_user),
    CONSTRAINT fk_movie_user FOREIGN KEY (id_movie) REFERENCES Movie(id_movie)
);

CREATE TABLE IF NOT EXISTS DirectedBy(
    id_director INT NOT NULL,
    id_movie INT NOT NULL,
    CONSTRAINT fk_director_movie FOREIGN KEY (id_director) REFERENCES Director(id_director),
    CONSTRAINT fk_movie_director FOREIGN KEY (id_movie) REFERENCES Movie(id_movie)
);

CREATE TABLE IF NOT EXISTS HasGenre(
    id_genre INT NOT NULL,
    id_movie INT NOT NULL,
    CONSTRAINT fk_genre_movie FOREIGN KEY (id_genre) REFERENCES Genre(id_genre),
    CONSTRAINT fk_movie_genre FOREIGN KEY (id_movie) REFERENCES Movie(id_movie)
);

CREATE TABLE IF NOT EXISTS Logs( 
    id_log INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    id_user INT NOT NULL,
    date DATETIME NOT NULL,
    action VARCHAR(100) NOT NULL,
    CONSTRAINT fk_user_log FOREIGN KEY (id_user) REFERENCES User(id_user)
);

CREATE TABLE IF NOT EXISTS Preferences(
    id_user INT NOT NULL,
    id_genre INT NOT NULL,
    CONSTRAINT fk_user_preference FOREIGN KEY (id_user) REFERENCES User(id_user),
    CONSTRAINT fk_genre_preference FOREIGN KEY (id_genre) REFERENCES Genre(id_genre)
);
