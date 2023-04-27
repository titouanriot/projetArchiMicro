import { AfterViewInit, Component, HostBinding, OnInit, ViewChild } from '@angular/core';
import {Movie} from '../../models/movie';
import { MoviesService } from '../../services/movies.service';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

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
export class ListMoviesComponent implements OnInit, AfterViewInit {


  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  
  listMovies: Movie[] = <Movie[]>[];
  listMoviesToDisplay : any;

  ngAfterViewInit() {
    this.listMoviesToDisplay.paginator = this.paginator;
    this.listMoviesToDisplay.sort = this.sort;
  }
   
  columnsToDisplay = ['original_title', 'title', 'language'];
  columnsToDisplayWithExpand = [...this.columnsToDisplay, 'expand'];
  expandedElement: Movie | null = null;

  constructor(private moviesService : MoviesService){}
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.listMoviesToDisplay.filter = filterValue.trim().toLowerCase();
    if (this.listMoviesToDisplay.paginator) {
      this.listMoviesToDisplay.paginator.firstPage();
    }
  }

  ngOnInit(): void {
    this.listMovies = this.moviesService.listMovies;
    console.log(this.listMovies)
    this.listMoviesToDisplay = new MatTableDataSource(this.listMovies);
  }

  addToFavorite(movie: Movie){
    console.log("button add To Favorite");
    this.moviesService.addToFavorite(movie);
  }

  removeFromList(movie_to_delete : Movie){
    let res = this.moviesService.removeFromList(movie_to_delete);
    res.then(
      _ => {
        this.listMoviesToDisplay._updateChangeSubscription();
      }
    )
  }
}
