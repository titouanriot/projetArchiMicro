import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Genre } from 'src/app/models/Genre';
import { environment } from 'src/environment/environment';

@Injectable({
  providedIn: 'root'
})
export class GenresService implements OnInit{
  api_url : string = "";
  genre_endpoint = "/genres";
  constructor(private http : HttpClient) {
    this.api_url = environment.backendBaseUrl;
   }

  genres : Genre[] = [];

  ngOnInit(): void {
    this.getAllGenres().then(
      genres => {
        if (genres) {
          this.genres = genres;
        } 
      }
    )
  }

  async getAllGenres(){
    if (this.genres.length == 0) {
      const promise = new Promise<Genre[]>((resolve, reject) => {
        this.http.get<Genre[]>(this.api_url + this.genre_endpoint + "/get_all").subscribe({
          next: (res : Genre[]) => {
            resolve(res);
          },
          error : (err : any) => {
            reject(err);
          }
        });
      });
      return promise;
    }
    else{
      return this.genres;
    }
  }


}
