import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from '../services/user.service';

@Injectable({
  providedIn: 'root'
})
export class HasPreferenciesGuard implements CanActivate {

  constructor(private userService : UserService, private _router: Router){}

  //get connected user
  connectedUser = 7;

  async canActivate(): Promise<boolean> {
    console.log("coucou guard !!")
    console.log(await this.userService.has_preferences(this.connectedUser));
    if (await this.userService.has_preferences(this.connectedUser)){
      return true;
    }
    else {
      this._router.navigate(["app/preferences"]);
      return false;
    }
  }

}
