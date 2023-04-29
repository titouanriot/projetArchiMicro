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

const routes : Routes = [
    {path : '', component : ContainerComponent, children:[
        {path: "propose-movie", component : ProposeMovieComponent, canActivate : [HasPreferenciesGuard]},
        {path: "preferences", component: PreferencesComponent},
        {path: "menu", component : MenuComponent},
        {path: "films-vus",component: WatchedComponent},
        {path : "list-movies", component : ListMoviesComponent, canActivate : [HasPreferenciesGuard]},
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