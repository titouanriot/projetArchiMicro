import { HttpClient } from '@angular/common/http';
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
}
