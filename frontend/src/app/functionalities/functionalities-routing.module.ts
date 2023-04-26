import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContainerComponent } from './common/container/container.component';
import { ListMoviesComponent } from './movies/list-movies/list-movies.component';
import { CommonModule } from '@angular/common';

const routes : Routes = [
    {path : '', component : ContainerComponent, children:[
        {path : "list-movies", component : ListMoviesComponent},
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