import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { MomentDateModule } from '@angular/material-moment-adapter';

import { HeaderComponent } from './common/header/header.component';
import { FooterComponent } from './common/footer/footer.component';
import { CguComponent } from './pages/infos/cgu/cgu.component';
import { ContactsComponent } from './pages/infos/contacts/contacts.component';
import { PresentationComponent } from './pages/infos/presentation/presentation.component';
import { ConnexionComponent } from './pages/authentification/connexion/connexion.component';
import { Erreur404Component } from './pages/infos/erreur404/erreur404.component';
import { InscriptionComponent } from './pages/authentication/inscription/inscription.component';
import { PreferencesComponent } from './pages/preferences/preferences.component';

import { AngularMaterialModule } from './angular-material.module';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    CguComponent,
    ContactsComponent,
    PresentationComponent,
    ConnexionComponent,
    Erreur404Component,
    InscriptionComponent,
    PreferencesComponent
  ],
  imports: [
    AngularMaterialModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MomentDateModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
