import { NgModule } from '@angular/core';
import { RouterModule } from "@angular/router";
import {DataAnalysisComponent} from "./data-analysis.unit/data-analysis.component";

@NgModule({
  imports: [
    RouterModule.forRoot([
      {
        path: '',
        redirectTo: '/craft',
        pathMatch: 'full'
      },
      {path: 'data-analysis', component: DataAnalysisComponent},
    ])
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
