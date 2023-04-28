import { Component } from '@angular/core';
import { Genre } from 'src/app/models/Genre';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-preferences',
  templateUrl: './preferences.component.html',
  styleUrls: ['./preferences.component.scss']
})
export class PreferencesComponent {


  errorMessage = "";


  constructor(private userService : UserService, private _router : Router){}

  genres: Array<{genre: Genre, selected: boolean}> = [
    {genre: {id: 28, name: 'Action'}, selected: false},
    {genre: {id: 12, name: 'Aventure'}, selected: false},
    {genre: {id: 16, name: 'Animation'}, selected: false},
    {genre: {id: 35, name: 'Comédie'}, selected: false},
    {genre: {id: 80, name: 'Crime'}, selected: false},
    {genre: {id: 99, name: 'Documentaire'}, selected: false},
    {genre: {id: 18, name: 'Drame'}, selected: false},
    {genre: {id: 10751, name: 'Familial'}, selected: false},
    {genre: {id: 14, name: 'Fantastique'}, selected: false},
    {genre: {id: 36, name: 'Histoire'}, selected: false},
    {genre: {id: 27, name: 'Horreur'}, selected: false},
    {genre: {id: 10402, name: 'Musique'}, selected: false},
    {genre: {id: 9648, name: 'Mystère'}, selected: false},
    {genre: {id: 10749, name: 'Romance'}, selected: false},
    {genre: {id: 878, name: 'Science-Fiction'}, selected: false},
    {genre: {id: 10770, name: 'Téléfilm'}, selected: false},
    {genre: {id: 53, name: 'Thriller'}, selected: false},
    {genre: {id: 10752, name: 'Guerre'}, selected: false},
    {genre: {id: 37, name: 'Western'}, selected: false}
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
    //if true redirection
  }

}
