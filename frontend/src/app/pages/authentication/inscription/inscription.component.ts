import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DATE_FORMATS } from '@angular/material/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';
import * as moment from 'moment';

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
    let output = this.form.value;
    output.birthdate = output.birthdate.format('YYYY-MM-DD');

    this.authService.register(output);
    this.router.navigateByUrl('/connexion');
  }

}
