import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
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
  public isAdmin: Observable<boolean | null>;
  private isAdminSubject: BehaviorSubject<boolean | null>;

  constructor(
    private router: Router,
    private http: HttpClient
  ) { 
    this.userSubject = new BehaviorSubject(JSON.parse(localStorage.getItem('user')!));
    this.isAdminSubject = new BehaviorSubject(JSON.parse(localStorage.getItem('isAdmin')!));
    this.isAdmin = this.isAdminSubject.asObservable();
    this.user = this.userSubject.asObservable();
  }

  public getUserValue() {
    return this.userSubject.value;
  }

  async is_admin(email : string) : Promise<boolean> {
    const promise = new Promise<boolean>((resolve, reject) => {
      let params = new HttpParams().set("email", encodeURIComponent(email))
      this.http.get<boolean>(`${environment.backendBaseUrl}/auth/isAdmin`,{params : params}).subscribe({
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

  login(email: string, password: string) {
    return this.http.post<any>(`${environment.backendBaseUrl}/auth/login`, {email, password}).pipe(map(
      user => {
        localStorage.setItem('user', JSON.stringify(user));
        this.userSubject.next(user);
        this.is_admin(email).then(
          res => {
            localStorage.setItem('isAdmin', JSON.stringify(res));
            this.isAdminSubject.next(res);
          }
        )
        return user;
      }
    ));
  }


  logout() {
    localStorage.removeItem('user');
    localStorage.removeItem('isAdmin');
    this.userSubject.next(null);
    this.router.navigateByUrl('/connexion');
  }


  register(account: Account) {
    return this.http.post(`${environment.backendBaseUrl}/user/add_user`, account);
  }




}
