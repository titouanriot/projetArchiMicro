import { Injectable } from '@angular/core';
import { CategoryE, LanguageE, Movie } from '../models/movie';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environment/environment';

@Injectable({
  providedIn: 'root'
})
export class MoviesService {

  listMovies : Movie[] = <Movie[]>[];
  api_url_tmdb : string = "";
  api_key_tmdb : string = "";
  
  DATA : Movie[] = [
    {
      id_movie:1,
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
      id_movie:2,
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

  //implement save data to BDD
  async addToFavorite(movie : Movie){
    console.log("Service add to Favorite");
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

  constructor(private http : HttpClient) { 
    this.listMovies = this.DATA;
    this.api_url_tmdb = environment.api_url_tmdb;
    this.api_key_tmdb = environment.api_key_tmdb
  }
}
