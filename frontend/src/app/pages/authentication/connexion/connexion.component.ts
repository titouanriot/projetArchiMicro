import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { first } from 'rxjs';
import { Id } from 'src/app/models/id';
import { User } from 'src/app/models/user';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-connexion',
  templateUrl: './connexion.component.html',
  styleUrls: ['./connexion.component.scss']
})
export class ConnexionComponent implements OnInit{

  user:Id = {email: '', password: ''};

  error:boolean = false;

  constructor(
    private router: Router,
    private authService: AuthenticationService
  ) {this.authService.user.subscribe(u => this.connectedUser = u)}

  connectedUser: User | null = null;

  ngOnInit(): void {
    if (this.connectedUser != null) {
      this.router.navigateByUrl("/infos/cgu")
    }
  }


  onSubmit() {
    // this.error = (this.authService.login(this.user.email, this.user.password) == 'error');


    this.error = false;
    this.authService.login(this.user.email, this.user.password).pipe(first()).subscribe({
      next: () => {
        this.router.navigateByUrl('/infos/cgu');
      },
      error: error => {
        this.error = true;
      }
    })
  }


}
