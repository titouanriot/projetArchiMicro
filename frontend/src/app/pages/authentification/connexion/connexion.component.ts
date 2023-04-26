import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Id } from 'src/app/models/id';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-connexion',
  templateUrl: './connexion.component.html',
  styleUrls: ['./connexion.component.scss']
})
export class ConnexionComponent {

  user:Id = {username: '', password: ''};

  error:boolean = false;

  constructor(
    private router: Router,
    private authService: AuthenticationService
  ) {}


  onSubmit() {
    this.error = (this.authService.login(this.user.username, this.user.password) == 'error');
  }


}
