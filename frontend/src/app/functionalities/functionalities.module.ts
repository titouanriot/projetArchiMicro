import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AngularMaterialModule } from '../angular-material.module';
import { ContainerComponent } from './common/container/container.component';
import { ListMoviesComponent, DialogOverviewListMoviesDialog } from './movies/list-movies/list-movies.component';
import { FunctionalitiesRoutingModule } from './functionalities-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { ProposeMovieComponent, DialogOverviewProposeMovieDialog } from './movies/propose-movie/propose-movie.component';
import { MenuComponent } from './menu/menu.component';


@NgModule({
    declarations : [
        ContainerComponent,
        ListMoviesComponent,
        ProposeMovieComponent,
        MenuComponent,
        DialogOverviewProposeMovieDialog,
        DialogOverviewListMoviesDialog
    ],
    exports: [],
    imports : [
        CommonModule,
        AngularMaterialModule,
        FunctionalitiesRoutingModule,
        HttpClientModule,
        FormsModule
    ],
    providers: [],
    bootstrap : []
})
export class FunctionalitiesModule{}