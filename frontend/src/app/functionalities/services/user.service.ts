import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Genre } from 'src/app/models/Genre';
import { User } from 'src/app/models/user';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { environment } from 'src/environment/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  api_url : string = "";
  user_endpoint = "/user";
  connectedUser : User | null = null;

  constructor(private http : HttpClient, private authService : AuthenticationService) {
    this.api_url = environment.backendBaseUrl;
    this.authService.user.subscribe(
      u => this.connectedUser = u
    )
  }

  async has_preferences(email : string) : Promise<boolean> {
    const promise = new Promise<boolean>((resolve, reject) => {
      let params = new HttpParams().set("email", encodeURIComponent(email))
      this.http.get<boolean>(this.api_url + this.user_endpoint + "/has_preferences",{params : params}).subscribe({
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


  async setPreferences(genres : Array<Genre>){
    const promise = new Promise<boolean>((resolve, reject) => {
      let params = {
        'email' : this.connectedUser?.email,
        'genres' : JSON.parse(JSON.stringify(genres))
      }
      this.http.post<boolean>(this.api_url + this.user_endpoint + "/set_preferences",params).subscribe({
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

}
