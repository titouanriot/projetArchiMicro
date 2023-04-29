import { Component, HostBinding } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent {

  @HostBinding('class') className = 'darkMode';


  constructor( private authService : AuthenticationService){}

  disconnect() {
    this.authService.logout()
  }



}
