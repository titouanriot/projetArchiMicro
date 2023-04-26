import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { HeaderComponent } from './common/header/header.component';
import { FooterComponent } from './common/footer/footer.component';
import { CguComponent } from './pages/infos/cgu/cgu.component';
import { ContactsComponent } from './pages/infos/contacts/contacts.component';
import { PresentationComponent } from './pages/infos/presentation/presentation.component';
import { AngularMaterialModule } from './angular-material.module';
import { FunctionalitiesRoutingModule } from './functionalities/functionalities-routing.module';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    CguComponent,
    ContactsComponent,
    PresentationComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    AngularMaterialModule,
    FunctionalitiesRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
