import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environment/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  api_url : string = "";
  user_endpoint = "/user";

  constructor(private http : HttpClient) {
    this.api_url = environment.backendBaseUrl;
  }

  async has_preferences(id : number) : Promise<boolean> {
    const promise = new Promise<boolean>((resolve, reject) => {
      let params = new HttpParams().set("id",id)
      this.http.get<boolean>(this.api_url + this.user_endpoint + "/has_preferences",{params : params}).subscribe({
        next: (res : boolean) => {
          console.log("has preferencies");
          console.log(res)
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
