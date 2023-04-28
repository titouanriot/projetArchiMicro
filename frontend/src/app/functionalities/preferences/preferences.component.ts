import { Component, OnInit } from '@angular/core';
import { Genre } from 'src/app/models/Genre';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-preferences',
  templateUrl: './preferences.component.html',
  styleUrls: ['./preferences.component.scss']
})
export class PreferencesComponent implements OnInit {


  errorMessage = "";
  connectedUser: User | null = null;

  constructor(private userService : UserService, private _router : Router, private authService : AuthenticationService){
    this.authService.user.subscribe(u => this.connectedUser = u);
  }

  ngOnInit(): void {
    //ajouter genres services
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

  genres: Array<{genre: Genre, selected: boolean}> = [
    {genre: {id_genre: 28, genre_name: 'Action'}, selected: false},
    {genre: {id_genre: 12, genre_name: 'Aventure'}, selected: false},
    {genre: {id_genre: 16, genre_name: 'Animation'}, selected: false},
    {genre: {id_genre: 35, genre_name: 'Comédie'}, selected: false},
    {genre: {id_genre: 80, genre_name: 'Crime'}, selected: false},
    {genre: {id_genre: 99, genre_name: 'Documentaire'}, selected: false},
    {genre: {id_genre: 18, genre_name: 'Drame'}, selected: false},
    {genre: {id_genre: 10751, genre_name: 'Familial'}, selected: false},
    {genre: {id_genre: 14, genre_name: 'Fantastique'}, selected: false},
    {genre: {id_genre: 36, genre_name: 'Histoire'}, selected: false},
    {genre: {id_genre: 27, genre_name: 'Horreur'}, selected: false},
    {genre: {id_genre: 10402, genre_name: 'Musique'}, selected: false},
    {genre: {id_genre: 9648, genre_name: 'Mystère'}, selected: false},
    {genre: {id_genre: 10749, genre_name: 'Romance'}, selected: false},
    {genre: {id_genre: 878, genre_name: 'Science-Fiction'}, selected: false},
    {genre: {id_genre: 10770, genre_name: 'Téléfilm'}, selected: false},
    {genre: {id_genre: 53, genre_name: 'Thriller'}, selected: false},
    {genre: {id_genre: 10752, genre_name: 'Guerre'}, selected: false},
    {genre: {id_genre: 37, genre_name: 'Western'}, selected: false}
  ];

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
