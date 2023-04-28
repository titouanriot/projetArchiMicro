import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Route, Router, RouterStateSnapshot, UrlSegment, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { User } from 'src/app/models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanLoad {

  constructor(
    private authService: AuthenticationService,
    private router: Router
  ) {
    this.authService.user.subscribe(u => this.user = u)
  }

  user: User | null = null;


  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    let isLoggedIn = (this.user != null);

    if (!isLoggedIn) {
      this.router.navigateByUrl("/connexion");
    }

    return isLoggedIn;
  }

  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    let isLoggedIn = (this.user != null);

    if (!isLoggedIn) {
      this.router.navigateByUrl("/connexion");
    }

    return isLoggedIn;
  }

}
