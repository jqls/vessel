import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import { FormsModule }   from '@angular/forms';

import {EtlComponent} from './etl.component';
import {InputFormComponent} from "./newtask/input-form.component";
import {TaskListComponent} from "./tasklist/tasklist.component";
import {ETLRoutingModule} from "./etl.routing.module";
import {SelectModule} from "angular2-select";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ETLRoutingModule,
        SelectModule
    ],
    declarations: [
        EtlComponent,
        InputFormComponent,
        TaskListComponent
    ]
})
export class ETLModule {
}
