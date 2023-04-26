import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../models/user';
import { Router } from '@angular/router';
import { Account } from '../models/account';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private userSubject: BehaviorSubject<User | null>;
  public user: Observable<User | null>;

  constructor(
    private router: Router
  ) { 
    this.userSubject = new BehaviorSubject(JSON.parse(localStorage.getItem('user')!));
    this.user = this.userSubject.asObservable();
  }


  public getUserValue() {
    return this.userSubject.value;
  }
 

  login(username: string, password: string) {
    let user = {
      username: 'toto',
      id: 1234,
      token: "lolololo"
    }

    if (username == 'toto' && password == 'toto123') {
      localStorage.setItem('user', JSON.stringify(user));
      this.userSubject.next(user);
      this.router.navigateByUrl("/infos/cgu");
      return 'ok';
    } else {
      this.router.navigateByUrl('/connexion');
      return 'error';
    }

  }


  logout() {
    localStorage.removeItem('user');
    this.userSubject.next(null);
    this.router.navigateByUrl('/connexion');
  }


  register(account: Account) {
    console.log(account);
  }




}