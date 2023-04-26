import { Injectable } from '@angular/core';
import { CategoryE, LanguageE, Movie } from '../models/movie';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MoviesService {

  listMovies : Movie[] = <Movie[]>[];
  

  DATA : Movie[] = [
    {
      original_title : "titre original 1",
      title : "titre 1",
      language : LanguageE.fr,
      category : CategoryE.action,
      realease_date : new Date(),
      runtime : 180,
      vote_average : 86,
      vote_count : 1500,
      overview : "Un super premier film !"
    },
    {
      original_title : "titre original 2",
      title : "titre 2",
      language : LanguageE.en,
      category : CategoryE.comedy,
      realease_date : new Date(),
      runtime : 160,
      vote_average : 94,
      vote_count : 3400,
      overview : "Arboin le lover!"
    }
  ]
  async getMovieSelection(){
    //to implement
  }


  async getMovie(){
    //to implement
  }

  async addToFavorite(movie : Movie){
    console.log("Service add to Favorite");
  }

  async removeFromList(movie_to_delete : Movie){
    let index = this.listMovies.findIndex(movie => movie == movie_to_delete);
    if (index >= 0 ){
      this.listMovies.splice(index, 1);
    }
    return (index >= 0);
  }

  constructor() { 
    this.listMovies = this.DATA;
  }
}
