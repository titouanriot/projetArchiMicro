import { Component, HostBinding } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent{

  title = 'WatchOurMovie';

  isConnected = true;
  isAdmin = true;

  @HostBinding('class') className = 'darkMode';


}
