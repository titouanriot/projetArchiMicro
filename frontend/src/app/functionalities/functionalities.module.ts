import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AngularMaterialModule } from '../angular-material.module';
import { ContainerComponent } from './common/container/container.component';
import { ListMoviesComponent } from './movies/list-movies/list-movies.component';
import { FunctionalitiesRoutingModule } from './functionalities-routing.module';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
    declarations : [
        ContainerComponent,
        ListMoviesComponent
    ],
    exports: [],
    imports : [
        CommonModule,
        AngularMaterialModule,
        FunctionalitiesRoutingModule,
        HttpClientModule
    ],
    providers: [],
    bootstrap : []
})
export class FunctionalitiesModule{}