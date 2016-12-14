import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {EtlComponent} from './etl.component';
import {ETLRoutingModule} from "./etl.routing.module";
import {FormsModule} from "@angular/forms";
import {TaskListComponent} from './tasklist/tasklist.component';
import {NewTaskComponent} from './newtask/newtask.component';
import {DrawboardComponent} from './newtask/drawboard/drawboard.component';
import {EtlToolboxComponent} from './newtask/toolbox/toolbox.component';
import {EtlParametersComponent} from './newtask/parameters/parameters.component';
import {SelectModule} from "angular2-select";
import {TaskListService} from "./tasklist/tasklist.service";
import {SocketService} from "./newtask/socket.service";
import {InputFormService} from "./newtask/input-form.service";
import {ParameterService} from './newtask/parameters/parameters.service';
import {ParameterType} from "../share/json-types";
import {DataInteractionService} from './newtask/data-interaction.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ETLRoutingModule,
    SelectModule
  ],
  declarations: [
    DrawboardComponent,
    EtlComponent,
    TaskListComponent,
    NewTaskComponent,
    DrawboardComponent,
    EtlToolboxComponent,
    EtlParametersComponent    
  ],
  providers: [
    TaskListService,
    SocketService,
    InputFormService,
    DataInteractionService,
    ParameterService
  ]
})
export class ETLModule {
}

