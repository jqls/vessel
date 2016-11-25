import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CraftComponent } from './craft.component';
import { CraftRoutingModule } from "./craft-routing.module";

@NgModule({
  imports: [
    CommonModule,
    CraftRoutingModule
  ],
  declarations: [CraftComponent]
})
export class CraftModule { }
