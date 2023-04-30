import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { User } from 'src/app/models/user';
import { Movie } from '../models/movie';
import { environment } from 'src/environment/environment';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import {MatCardModule} from '@angular/material/card';
import { Watched } from '../models/watched';
import { MoviesService } from '../services/movies.service';

@Component({
  selector: 'app-watched',
  templateUrl: './watched.component.html',
  styleUrls: ['./watched.component.scss']
})

export class WatchedComponent {
  errorMessage = "";
  connectedUser: User | null = null;
  user_id !: number;
  watchedMovies: Movie[] = [];
  watched_movies_for_user: Watched[] = [];
  api_url_tmdb: string = "";
  movieCache: Movie[] = [];
  watchedMovie!: Watched;
  api_url: string;
  movie_endpoint: string = "/movie"

  constructor(private userService: UserService,
    private movieService: MoviesService,
    private _router: Router,
    private authService: AuthenticationService,
    private http: HttpClient
  ) {
    this.api_url_tmdb = environment.api_url_tmdb;
    this.api_url = environment.backendBaseUrl;
    this.authService.user.subscribe(u => this.connectedUser = u);
  }

  ngOnInit(): void {    
    this.userService.getWatched(this.connectedUser!.email).then(
      movies => {
        if (movies.length > 0) {
          movies.forEach(movie => {
            this.getImageCache(movie)
            this.watchedMovies?.push({...movie})            
            }
          )
        }
      }
    )
  }

  remove_watched_movie(movie_watched: Movie){
    this.userService.get_user_id(this.connectedUser!.email).then(
      id => {
        if(id){
          this.user_id = id
        }else{
          console.log("id_user not found in remove_watched_movie")
        }
        
      }
    )
    let watched_movie : Watched = {
      id_user : this.user_id,
      id_movie : movie_watched.id_movie,
      appreciation : -1
    }
    this.movieService.remove_watched_movie(watched_movie)
    const index = this.watchedMovies.findIndex(watched => watched.id_movie = watched_movie.id_movie)
    this.watchedMovies.splice(index,1)
  } 


  getImageCache(movie: Movie){
    this.http.get(this.api_url_tmdb + movie.poster_path.substring(1)).subscribe(
      (data) => {
      },
      (error: HttpErrorResponse) => {
        if (error.status === 404) {
          movie.poster_path = "assets/imageNotFound.png"
          this.movieCache?.push({...movie});
        } else {        
          movie.poster_path = this.api_url_tmdb + movie.poster_path.substring(1);
          this.movieCache?.push({...movie});
        }
      }
    );

  }

  getImage(my_movie: Movie){    
    const movieImage = this.movieCache.find(movie => movie.id_movie === my_movie.id_movie)
    if(movieImage){      
      return movieImage.poster_path
    } else {
      return ""
    }
  }
}

