import { NgModule } from '@angular/core';

import {MatToolbarModule} from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';

@NgModule({
    exports : [
        MatToolbarModule,
        MatIconModule,
        MatSlideToggleModule
    ]
})
export class AngularMaterialModule{}