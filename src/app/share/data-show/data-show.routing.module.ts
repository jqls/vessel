import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";
import {DataShowComponent} from "./data-show.component";
@NgModule({
  imports: [
    RouterModule.forChild([
      {path: 'result-show', component: DataShowComponent},
    ]),
  ],
  exports: [
    RouterModule
  ]
})
export class DataShowRoutingModule {}
