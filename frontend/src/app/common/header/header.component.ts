import { Component, HostBinding } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent{

  title = 'WatchOurMovie';
  isConnected = false;

  constructor(
    private authService: AuthenticationService
  ) {
    this.authService.user.subscribe(u => this.isConnected = (u != null))
  }

  isAdmin = true;

  @HostBinding('class') className = 'darkMode';

  disconnect() {
    this.authService.logout()
  }

}
