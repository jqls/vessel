import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CraftComponent } from './craft.component';
import { CraftRoutingModule } from "./craft-routing.module";
import { DrawboardComponent } from './drawboard/drawboard.component';
import { ToolboxComponent } from './toolbox/toolbox.component';
import {CraftService} from "./craft.service";

@NgModule({
  imports: [
    CommonModule,
    CraftRoutingModule
  ],
  declarations: [
    CraftComponent,
    DrawboardComponent,
    ToolboxComponent
  ],
  providers: [
    CraftService
  ]
})
export class CraftModule { }
