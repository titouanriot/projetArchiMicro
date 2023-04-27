import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DATE_FORMATS } from '@angular/material/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';
import * as moment from 'moment';
import { Account } from 'src/app/models/account';
import { first } from 'rxjs';

export const MY_FORMATS = {
  parse: {
    dateInput: 'DD/MM/YYYY',
  },
  display: {
    dateInput: 'DD/MM/YYYY',
    monthYearLabel: 'YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'YYYY',
  },
};

@Component({
  selector: 'app-inscription',
  templateUrl: './inscription.component.html',
  styleUrls: ['./inscription.component.scss'],
  providers: [
    {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
  ]
})
export class InscriptionComponent implements OnInit{

  form!: FormGroup;
  maxDate = moment().subtract(1, 'y');
  errorServer: boolean = false;
  errorUser: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthenticationService,
    private router: Router,
  ) {}

  ngOnInit(): void {
     this.form = this.formBuilder.group({
        firstname: ['', Validators.required],
        lastname: ['', Validators.required],
        email: ['', Validators.email],
        birthdate: ['', Validators.required],
        password: ['', Validators.required],
     }) 
  }

  get f() { return this.form.controls; }


  onSubmit() {
    let output: Account = {
      first_name: this.form.value.firstname,
      last_name: this.form.value.lastname,
      email: this.form.value.email,
      birth_date: this.form.value.birthdate.format('YYYY-MM-DD'),
      password: this.form.value.password,
      is_user_account_active: true,
      is_admin: false
    }

    this.errorServer = false;
    this.errorUser = false;

    this.authService.register(output)
    .pipe(first())
    .subscribe({
        next: () => {
          this.router.navigateByUrl('/connexion');
        },
        error: error => {
          this.errorUser = (error.status == 400);
          this.errorServer = (error.status == 500);
        }
    });
  }

}
