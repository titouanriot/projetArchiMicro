import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { User } from 'src/app/models/user';

@Injectable({
  providedIn: 'root'
})
export class HasPreferenciesGuard implements CanActivate {

  constructor(private userService : UserService, private _router: Router,
    private authService : AuthenticationService){
      this.authService.user.subscribe(u => this.connectedUser = u);
    }

  connectedUser:User | null = null;

  async canActivate(): Promise<boolean> {
    if (await this.userService.has_preferences(this.connectedUser!.email)){
      return true;
    }
    else {
      this._router.navigate(["app/preferences"]);
      return false;
    }
  }

}
