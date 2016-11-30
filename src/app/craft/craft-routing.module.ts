import { NgModule } from '@angular/core';
import { RouterModule } from "@angular/router";
import { CraftComponent } from "./craft.component";
import {ListExperimentsComponent} from "./list-experiments.component";

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'Experiment',
        component: CraftComponent,
      },
      {
        path: 'ExperimentList',
        component: ListExperimentsComponent,
      },
    ])
  ],
  exports: [
    RouterModule
  ]
})
export class CraftRoutingModule { }
