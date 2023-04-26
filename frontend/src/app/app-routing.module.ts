import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CguComponent } from './pages/infos/cgu/cgu.component';
import { ContactsComponent } from './pages/infos/contacts/contacts.component';
import { PresentationComponent } from './pages/infos/presentation/presentation.component';

const routes: Routes = [
  {path: "cgu", component: CguComponent},
  {path: "contacts", component: ContactsComponent},
  {path: "presentation", component: PresentationComponent},
  {path : 'app', loadChildren: () => import('./functionalities/functionalities.module').then(m => m.FunctionalitiesModule)}, //, canActivate:[AuthGuard], canLoad:[AuthGuard]
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
