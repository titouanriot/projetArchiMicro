import { Component, OnInit } from '@angular/core';
import { Movie } from '../../models/movie';
import { MoviesService } from '../../services/movies.service';
import { environment } from 'src/environment/environment';

@Component({
  selector: 'app-propose-movie',
  templateUrl: './propose-movie.component.html',
  styleUrls: ['./propose-movie.component.scss']
})
export class ProposeMovieComponent implements OnInit{

  listMovies: Movie[] = <Movie[]>[];
  selectedMovie! : Movie;
  indexSelectedMovie = 0;
  api_url_tmdb = "";

  constructor(private moviesService : MoviesService){}

  ngOnInit(): void {
    this.api_url_tmdb = environment.api_url_tmdb;
    this.listMovies = this.moviesService.listMovies;
    this.selectedMovie = this.listMovies[0];
  }

  addToFavorite(movie: Movie){
    console.log("button add To Favorite");
    this.moviesService.addToFavorite(movie);
  }

  removeFromList(){
    let movie_to_delete = this.selectedMovie;
    this.moviesService.removeFromList(movie_to_delete);
    if (this.indexSelectedMovie < this.listMovies.length -1 ){
      this.next();
    }
    else if (this.indexSelectedMovie > 0) {
      this.back()
    }
    else if (this.listMovies.length == 1){
      this.indexSelectedMovie = 0;
      this.selectedMovie = this.listMovies[0];
    }
  }

  getNewBatch(){
    console.log("get new batch");
    this.indexSelectedMovie = 0;
  }

  back(){
    if (this.indexSelectedMovie > 0){
      this.indexSelectedMovie = this.indexSelectedMovie - 1;
      this.selectedMovie = this.listMovies[this.indexSelectedMovie]; 
    }
  }

  next(){
    if (this.indexSelectedMovie < this.listMovies.length -1){
      this.indexSelectedMovie = this.indexSelectedMovie + 1; 
      this.selectedMovie = this.listMovies[this.indexSelectedMovie]; 
    }
  }
    getImage(){
      return this.api_url_tmdb + this.selectedMovie.poster_path;
    }
}
