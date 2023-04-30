import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { User } from 'src/app/models/user';
import { Movie } from '../models/movie';
import { environment } from 'src/environment/environment';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import {MatCardModule} from '@angular/material/card';

@Component({
  selector: 'app-watched',
  templateUrl: './watched.component.html',
  styleUrls: ['./watched.component.scss']
})

export class WatchedComponent {
  errorMessage = "";
  connectedUser: User | null = null;
  
  watchedMovies: Movie[] = [];
  api_url_tmdb: string = "";
  movieCache: Movie[] = [];

  constructor(private userService: UserService,
    private _router: Router,
    private authService: AuthenticationService,
    private http: HttpClient
  ) {
    this.api_url_tmdb = environment.api_url_tmdb;
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

