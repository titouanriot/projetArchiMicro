import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContainerComponent } from './common/container/container.component';
import { ListMoviesComponent } from './movies/list-movies/list-movies.component';
import { CommonModule } from '@angular/common';
import { PreferencesComponent } from '../pages/preferences/preferences.component';
import { HasPreferenciesGuard } from './guards/has-preferencies.guard';

const routes : Routes = [
    {path : '', component : ContainerComponent, children:[
        {path: "preferences", component: PreferencesComponent},
        {path : "list-movies", component : ListMoviesComponent, canActivate : [HasPreferenciesGuard]},
        {path : '', redirectTo: '/app/list-movies', pathMatch: 'full'}
    ]}
]

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(routes)],
    exports : [RouterModule]
})
export class FunctionalitiesRoutingModule {}