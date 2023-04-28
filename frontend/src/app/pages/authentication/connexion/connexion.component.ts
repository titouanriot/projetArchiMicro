import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { first } from 'rxjs';
import { Id } from 'src/app/models/id';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-connexion',
  templateUrl: './connexion.component.html',
  styleUrls: ['./connexion.component.scss']
})
export class ConnexionComponent {

  user:Id = {email: '', password: ''};

  error:boolean = false;

  constructor(
    private router: Router,
    private authService: AuthenticationService
  ) {}


  onSubmit() {

    this.error = false;
    this.authService.login(this.user.email, this.user.password).pipe(first()).subscribe({
      next: () => {
        this.router.navigateByUrl('/app/propose-movie');
      },
      error: error => {
        this.error = true;
      }
    })
  }


}
