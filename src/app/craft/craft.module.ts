import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CraftComponent} from './craft.component';
import {CraftRoutingModule} from "./craft-routing.module";
import {DrawboardComponent} from './drawboard/drawboard.component';
import {ToolboxComponent} from './toolbox/toolbox.component';
import {CraftService} from "./craft.service";
import {ParametersComponent} from './parameters/parameters.component';
import {ReactiveFormsModule, FormsModule} from "@angular/forms";
import {DynamicFormModule} from "../share/dynamic-form/dynamic-form.module";
import {ListExperimentsComponent} from "./list-experiments.component";
import {LogComponent} from './log/log.component';
import {TemplateComponent} from './toolbox/template/template.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    CraftRoutingModule,
    DynamicFormModule
  ],
  declarations: [
    CraftComponent,
    DrawboardComponent,
    ToolboxComponent,
    ParametersComponent,
    ListExperimentsComponent,
    LogComponent,
    TemplateComponent
  ],
  providers: [
    CraftService
  ],
  exports: [
    ToolboxComponent,
    DrawboardComponent,
    ParametersComponent
  ]
})
export class CraftModule {
}
