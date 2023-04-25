import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CguComponent } from './pages/infos/cgu/cgu.component';
import { ContactsComponent } from './pages/infos/contacts/contacts.component';
import { PresentationComponent } from './pages/infos/presentation/presentation.component';
import { ConnexionComponent } from './pages/authentification/connexion/connexion.component';

const routes: Routes = [
  {path: "", component: ConnexionComponent},
  {path: "cgu", component: CguComponent},
  {path: "contacts", component: ContactsComponent},
  {path: "presentation", component: PresentationComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
