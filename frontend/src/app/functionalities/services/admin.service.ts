import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Account } from 'src/app/models/account';
import { User } from 'src/app/models/user';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { environment } from 'src/environment/environment';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  listUsers : Account[] = <Account[]>[];
  connectedUser : User | null = null;
  api_url : string = "";
  user_endpoint = "/user";

  constructor(private http : HttpClient, private authService : AuthenticationService, private userService : UserService) { 
    this.api_url = environment.backendBaseUrl;
    this.authService.user.subscribe(
      u => this.connectedUser = u
    );
    this.getAllUsers().then(
      listUsers => {
        this.listUsers = listUsers;
      }
    )
  }

  async getAllUsers(){
    if (this.listUsers.length == 0) {
      const promise = new Promise<Account[]>((resolve, reject) => {
        this.http.get<Account[]>(this.api_url + this.user_endpoint + "/get_all").subscribe({
          next: (res : Account[]) => {
            this.listUsers = res;
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
      return this.listUsers;
    }
  }

  async grantAdmin(user : Account){
    const promise = new Promise<boolean>((resolve, reject) => {
      let params = {email_user_conected :  encodeURIComponent(this.connectedUser!.email), email_other_user : encodeURIComponent(user.email)};
      this.http.post<boolean>(this.api_url + this.user_endpoint + "/grant_admin", params).subscribe({
        next: (res : boolean) => {
          let index = this.listUsers.findIndex(userTab => userTab.email == user.email);
          if (index > -1){
            this.listUsers[index].is_admin = true;
          }
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
