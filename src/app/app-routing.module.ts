import { NgModule } from '@angular/core';
import { RouterModule } from "@angular/router";

@NgModule({
  imports: [
    RouterModule.forRoot([
      {
        path: '',
        redirectTo: '/craft',
        pathMatch: 'full'
      },
    ])
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
