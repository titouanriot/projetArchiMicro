import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Route, Router, RouterStateSnapshot, UrlSegment, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../services/authentication.service';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class IsAdminGuard implements CanActivate, CanLoad {

  constructor(
    private authService: AuthenticationService,
    private router: Router
  ) {
    this.authService.user.subscribe(u => this.user = u);
    this.authService.isAdmin.subscribe( status => this.isAdmin = status);
  }

  user: User | null = null;
  isAdmin: boolean | null = null;
  
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    

      let isLoggedIn = (this.user != null);
      if (isLoggedIn) {
        let hasAdminStatusSet = (this.isAdmin != null);
          if ((hasAdminStatusSet) && (this.isAdmin) ){
            return true;
          }
          else {
            this.router.navigateByUrl("/app");
          }
        }
      else {
        this.router.navigateByUrl("/connexion");
      }
  
      return isLoggedIn;

  }
  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      let isLoggedIn = (this.user != null);

      if (isLoggedIn) {
        let hasAdminStatusSet = (this.isAdmin != null);
          if ((!hasAdminStatusSet) && (this.isAdmin)){
            return true;
          }
          else {
            this.router.navigateByUrl("/app");
          }
        }
      else {
        this.router.navigateByUrl("/connexion");
      }
  
      return isLoggedIn;
  }
}
