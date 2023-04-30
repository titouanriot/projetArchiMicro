import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import {Movie} from '../../models/movie';
import { MoviesService } from '../../services/movies.service';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';

export interface DialogData {
  movieName: string;
}
@Component({
  selector: 'app-list-movies',
  templateUrl: './list-movies.component.html',
  styleUrls: ['./list-movies.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class ListMoviesComponent implements OnInit {


  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  
  listRecommendedMovies: Movie[] = <Movie[]>[];
  listMoviesToDisplay : any;
   
  columnsToDisplay = ['original_title', 'title', 'language'];
  columnsToDisplayWithExpand = [...this.columnsToDisplay, 'expand'];
  expandedElement: Movie | null = null;

  constructor(private moviesService : MoviesService, public dialog: MatDialog){}
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.listMoviesToDisplay.filter = filterValue.trim().toLowerCase();
    if (this.listMoviesToDisplay.paginator) {
      this.listMoviesToDisplay.paginator.firstPage();
    }
  }

  ngOnInit(): void {
    this.moviesService.getMovieSelection().then(
      listMovies => {
        this.listRecommendedMovies = this.moviesService.listRecommendedMovies;
        this.listMoviesToDisplay = new MatTableDataSource(this.listRecommendedMovies);
        this.listMoviesToDisplay.paginator = this.paginator;
        this.listMoviesToDisplay.sort = this.sort;
      }
    )
  }

  async getNewBatch(){
    await this.moviesService.getNewBatch().then(
      _ => {
        this.listRecommendedMovies = this.moviesService.listRecommendedMovies;
        this.listMoviesToDisplay = new MatTableDataSource(this.listRecommendedMovies);
      }
    )
  }

  addToWatched(movie: Movie){
    const dialogRef = this.dialog.open(DialogOverviewListMoviesDialog, {
      data: {movieName: movie.title},
    });

    dialogRef.afterClosed().subscribe(note => {
      if (note){
        this.moviesService.addToWatched(movie, note);
      }
    });
  }
}

@Component({
  selector: 'dialog-overview-example-dialog',
  templateUrl: './dialog-overview-example-dialog.html',
})
export class DialogOverviewListMoviesDialog {
  constructor(
    public dialogRef: MatDialogRef<DialogOverviewListMoviesDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
  ) {}

  note = 5;

  onNoClick(): void {
    this.dialogRef.close();
  }
}