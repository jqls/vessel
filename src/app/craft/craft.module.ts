import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CraftComponent } from './craft.component';
import { CraftRoutingModule } from "./craft-routing.module";
import { DrawboardComponent } from './drawboard/drawboard.component';

@NgModule({
  imports: [
    CommonModule,
    CraftRoutingModule
  ],
  declarations: [CraftComponent, DrawboardComponent]
})
export class CraftModule { }
