import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContainerComponent } from './common/container/container.component';
import { ListMoviesComponent } from './movies/list-movies/list-movies.component';
import { CommonModule } from '@angular/common';
import { PreferencesComponent } from './preferences/preferences.component';
import { HasPreferenciesGuard } from './guards/has-preferencies.guard';
import { ProposeMovieComponent } from './movies/propose-movie/propose-movie.component';
import { MenuComponent } from './menu/menu.component';
import { WatchedComponent } from './watched/watched.component';
import { AdminMenuComponent } from './admin/admin-menu/admin-menu.component';
import { IsAdminGuard } from '../guards/is-admin.guard';
import { GroupGestionComponent } from './groups/group-gestion/group-gestion.component';
import { GroupDetailComponent } from './groups/group-detail/group-detail.component';
import { GroupesComponent } from './groups/groupes/groupes.component';

const routes : Routes = [
    {path : '', component : ContainerComponent, children:[
        {path: "propose-movie", component : ProposeMovieComponent, canActivate : [HasPreferenciesGuard]},
        {path: "preferences", component: PreferencesComponent},
        {path: "menu", component : MenuComponent},
        {path: "films-vus",component: WatchedComponent},
        {path : "list-movies", component : ListMoviesComponent, canActivate : [HasPreferenciesGuard]},
        {path : "admin-panel", component : AdminMenuComponent, canActivate : [IsAdminGuard],  canLoad : [IsAdminGuard]},
        {path: "mes-groupes", component: GroupGestionComponent},
        {path: "groups", component: GroupesComponent},
        {path: "mes-groupes/:groupId", component: GroupDetailComponent},
        {path : '', redirectTo: '/app/propose-movie', pathMatch: 'full'}
    ]}
]

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(routes)],
    exports : [RouterModule]
})
export class FunctionalitiesRoutingModule {}