import { NgModule } from '@angular/core';
import { RouterModule } from "@angular/router";
import { CraftComponent } from "./craft.component";

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'craft',
        component: CraftComponent,
      },
    ])
  ],
  exports: [
    RouterModule
  ]
})
export class CraftRoutingModule { }
