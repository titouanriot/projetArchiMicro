import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CguComponent } from './pages/infos/cgu/cgu.component';
import { ContactsComponent } from './pages/infos/contacts/contacts.component';
import { PresentationComponent } from './pages/infos/presentation/presentation.component';
import { ConnexionComponent } from './pages/authentification/connexion/connexion.component';
import { Erreur404Component } from './pages/infos/erreur404/erreur404.component';
import { InscriptionComponent } from './pages/authentication/inscription/inscription.component';

const routes: Routes = [
  {path: "", component: ConnexionComponent},
  {path: "connexion", component: ConnexionComponent},
  {path: "inscription", component: InscriptionComponent},
  {path: "infos/cgu", component: CguComponent},
  {path: "infos/contacts", component: ContactsComponent},
  {path: "infos/presentation", component: PresentationComponent},
  {path: "**", component: Erreur404Component},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
