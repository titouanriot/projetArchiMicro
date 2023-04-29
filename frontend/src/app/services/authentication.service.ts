import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../models/user';
import { Router } from '@angular/router';
import { Account } from '../models/account';
import { map } from 'rxjs/operators';

import { environment } from 'src/environment/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private userSubject: BehaviorSubject<User | null>;
  public user: Observable<User | null>;

  constructor(
    private router: Router,
    private http: HttpClient
  ) { 
    this.userSubject = new BehaviorSubject(JSON.parse(localStorage.getItem('user')!));
    this.user = this.userSubject.asObservable();
  }


  public getUserValue() {
    return this.userSubject.value;
  }
 

  login(email: string, password: string) {

    return this.http.post<any>(`${environment.backendBaseUrl}/auth/login`, {email, password}).pipe(map(
      user => {
        localStorage.setItem('user', JSON.stringify(user));
        this.userSubject.next(user);
        return user;
      }
    ));

  }


  logout() {
    localStorage.removeItem('user');
    this.userSubject.next(null);
    this.router.navigateByUrl('/connexion');
  }


  register(account: Account) {
    return this.http.post(`${environment.backendBaseUrl}/user/add_user`, account);
  }




}
