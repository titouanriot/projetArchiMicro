import { Injectable } from '@angular/core';
import { Movie } from '../models/movie';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environment/environment';
import { User } from 'src/app/models/user';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { Watched } from '../models/watched';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class MoviesService {

  listRecommendedMovies : Movie[] = <Movie[]>[];
  api_url_tmdb : string = "";
  api_key_tmdb : string = "";
  connectedUser : User | null = null;
  api_url : string = "";
  movie_endpoint = "/movie";
  listWatchedMovies : Watched[] = <Watched[]>[];

  
  constructor(private http : HttpClient, private authService : AuthenticationService, private userService : UserService) { 
    this.api_url = environment.backendBaseUrl;
    this.api_url_tmdb = environment.api_url_tmdb;
    this.api_key_tmdb = environment.api_key_tmdb;
    this.authService.user.subscribe(
      u => this.connectedUser = u
    )
    this.getMovieSelection().then(
      listMovies => {
        this.listRecommendedMovies = listMovies;
      }
    )
  }

  async getNewBatch(){
    this.listRecommendedMovies = [];
    await this.getMovieSelection().then(
      movies => {
        this.listRecommendedMovies = movies;
      }
    )
  }

  async getMovieSelection(){
    if (this.listRecommendedMovies.length == 0) {
      await this.userService.get_user_id(this.connectedUser!.email).then(
        user_id => {
            const promise = new Promise<Movie[]>((resolve, reject) => {
              this.http.get<Movie[]>(this.api_url + this.movie_endpoint + "/user_recommendations/" + user_id).subscribe({
                next: (res : Movie[]) => {
                  this.listRecommendedMovies = res;
                  resolve(res);
                },
                error : (err : any) => {
                  reject(err);
                }
              });
            });
            return promise;
          }
      )
      return this.listRecommendedMovies;
    }
    else{
      return this.listRecommendedMovies;
    }
  }

  async addToWatched(movie : Movie, note : number){
    this.userService.get_user_id(this.connectedUser!.email).then(
      user_id => {
        const promise = new Promise<boolean>((resolve, reject) => {
          let watched_movie : Watched = {
            id_user : user_id,
            id_movie : movie.id_movie,
            appreciation : note
          }
          this.http.post<boolean>(this.api_url + this.movie_endpoint + "/add_watched_movie",watched_movie).subscribe({
            next: (res : boolean) => {
              resolve(res);
            },
            error : (err : any) => {
              reject(err);
            }
          });
        });
        return promise;
      });
  }

  async remove_watched_movie(watched_movie : Watched){
    
    this.http.delete<boolean>(this.api_url + this.movie_endpoint + "/remove_watched_movie",{body : watched_movie})
  }

 
  //implement save data in BDD
  // async removeFromList(movie_to_delete : Movie){
  //   let index = this.listRecommendedMovies.findIndex(movie => movie == movie_to_delete);
  //   if (index >= 0 ){
  //     this.listRecommendedMovies.splice(index, 1);
  //   }
  //   return (index >= 0);
  // }

  async getImageFromTMDB(movie : Movie){
    const promise = new Promise<boolean>((resolve, reject) => {
      this.http.get<boolean>(this.api_url_tmdb +"/" + movie.poster_path).subscribe({
        next: (res : boolean) => {
          resolve(res);
        },
        error : (err : any) => {
          reject(err);
        }
      });
    });
    return promise;
  }
}
