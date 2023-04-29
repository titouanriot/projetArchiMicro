import { Component, OnInit } from '@angular/core';
import { Genre } from 'src/app/models/Genre';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { User } from 'src/app/models/user';
import { GenreService } from '../services/genre.service';

@Component({
  selector: 'app-preferences',
  templateUrl: './preferences.component.html',
  styleUrls: ['./preferences.component.scss']
})
export class PreferencesComponent implements OnInit {


  errorMessage = "";
  connectedUser: User | null = null;

  constructor(private userService : UserService,
     private _router : Router,
     private authService : AuthenticationService,
     private genreService : GenreService){
    this.authService.user.subscribe(u => this.connectedUser = u);
  }

  ngOnInit(): void {
    this.genreService.getAllGenres().then(
      genres => {
        genres.forEach(
          genreItem => {
            this.genres.push({genre : genreItem, selected : false});
          }
        )
      }
    );
    this.userService.getPreferences(this.connectedUser!.email).then(
      preferences => {
        if (preferences.length > 0){
          this.genres.forEach(genre => {
            if (preferences.findIndex(preference => preference.id_genre === genre.genre.id_genre) > -1){
              genre.selected = true;
            }   
          })
        }
      }
    )
  }

  genres: Array<{genre: Genre, selected: boolean}> = [];

  allSelect: boolean = false;

  updateAllSelect() {
    this.allSelect = this.genres != null && this.genres.every(t => t.selected);
  }

  someSelect(): boolean {
    if (this.genres == null) {
      return false;
    }
    return this.genres.filter(t => t.selected).length > 0 && !this.allSelect;
  }

  setAll(selected: boolean) {
    this.allSelect = selected;
    if (this.genres == null) {
      return;
    }
    this.genres.forEach(t => t.selected = selected);
  }


  get isButtonDisabled(){
    return (this.genres.filter(t => t.selected).length == 0);
  }

  enregistrerPreferences(){
    let selectedPreferences = this.genres.filter(t => t.selected);
    console.log(selectedPreferences);
    let list_to_export : Genre[] = [];
    selectedPreferences.forEach(
      object => {
        list_to_export.push(object['genre']);
      }
    )
    let result = this.userService.setPreferences(list_to_export);
    result.then(
      res => {
        console.log('oh');
        this._router.navigate(["/app/propose-movie"]);
      },
      err => {
        this.errorMessage = "Une erreur s'est déroulée";
      }
      
    )
  }

}
