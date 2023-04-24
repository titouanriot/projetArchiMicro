import { Component, HostBinding, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  title = 'WatchOurMovie';

  toggleControl = new FormControl(false);
  @HostBinding('class') className = 'lightMode';

  ngOnInit() : void {
    this.toggleControl.valueChanges.subscribe(val => {
      this.className = val ? 'darkMode' : 'lightMode';
    })
  }

}
