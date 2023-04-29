import { Injectable } from '@angular/core';
import { CategoryE, LanguageE, Movie } from '../models/movie';
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

  listMovies : Movie[] = <Movie[]>[];
  api_url_tmdb : string = "";
  api_key_tmdb : string = "";
  connectedUser : User | null = null;
  api_url : string = "";
  movie_endpoint = "/movie";
  
  constructor(private http : HttpClient, private authService : AuthenticationService, private userService : UserService) { 
    this.listMovies = this.DATA;
    this.api_url = environment.backendBaseUrl;
    this.api_url_tmdb = environment.api_url_tmdb;
    this.api_key_tmdb = environment.api_key_tmdb;
    this.authService.user.subscribe(
      u => this.connectedUser = u
    )
  }

  DATA : Movie[] = [
    {
      id_movie : 76600,
      original_title : "titre original 1",
      title : "titre 1",
      language : LanguageE.fr,
      category : CategoryE.action,
      realease_date : new Date(),
      runtime : 180,
      vote_average : 86,
      vote_count : 1500,
      overview : "Un super premier film !",
      poster_path : "ahMxyHMSJXingQr4yJBMzMU9k42.jpg"
    },
    {
      id_movie : 2,
      original_title : "titre original 2",
      title : "titre 2",
      language : LanguageE.en,
      category : CategoryE.comedy,
      realease_date : new Date(),
      runtime : 160,
      vote_average : 94,
      vote_count : 3400,
      overview : "Arboin le lover!",
      poster_path : "hYeB9GpFaT7ysabBoGG5rbo9mF4.jpg"
    }
  ]

  //récupère nouvele sélectionde films du back
  async getNewBatch(){
    this.getMovieSelection();
  }

  async getMovieSelection(){
    //to implement
  }

  //implement 
  async getMovie(){
    //to implement
  }

  async addToWatched(movie : Movie, note : number){
    // const promise = new Promise<boolean>((resolve, reject) => {
    //   let watched_movie : Watched = {
    //     id_user : user_id,
    //     id_movie : movie.id_movie,
    //     appreciation : note
    //   }
    //   this.http.post<boolean>(this.api_url + this.user_endpoint + "/set_preferences",params).subscribe({
    //     next: (res : boolean) => {
    //       resolve(res);
    //     },
    //     error : (err : any) => {
    //       reject(err);
    //     }
    //   });
    // });
    // return promise;
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

  //implement save data in BDD
  async removeFromList(movie_to_delete : Movie){
    let index = this.listMovies.findIndex(movie => movie == movie_to_delete);
    if (index >= 0 ){
      this.listMovies.splice(index, 1);
    }
    return (index >= 0);
  }

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
