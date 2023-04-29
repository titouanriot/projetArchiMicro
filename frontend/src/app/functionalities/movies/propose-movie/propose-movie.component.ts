import { Component, Inject, OnInit } from '@angular/core';
import { Movie } from '../../models/movie';
import { MoviesService } from '../../services/movies.service';
import { environment } from 'src/environment/environment';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';

export interface DialogData {
  movieName: string;
}

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

  constructor(private moviesService : MoviesService, public dialog: MatDialog){}

  ngOnInit(): void {
    this.api_url_tmdb = environment.api_url_tmdb;
    this.listMovies = this.moviesService.listMovies;
    this.selectedMovie = this.listMovies[0];
  }

  addToWatched(): void {
    const dialogRef = this.dialog.open(DialogOverviewProposeMovieDialog, {
      data: {movieName: this.selectedMovie.title},
    });

    dialogRef.afterClosed().subscribe(note => {
      this.moviesService.addToWatched(this.selectedMovie, note);
    });
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


@Component({
  selector: 'dialog-overview-example-dialog',
  templateUrl: './dialog-overview-example-dialog.html',
})
export class DialogOverviewProposeMovieDialog {
  constructor(
    public dialogRef: MatDialogRef<DialogOverviewProposeMovieDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
  ) {}

  note = 5;

  onNoClick(): void {
    this.dialogRef.close();
  }
}