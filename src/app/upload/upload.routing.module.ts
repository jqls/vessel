import {RouterModule} from "@angular/router";
import {NgModule} from "@angular/core";
@NgModule({
  imports: [
    RouterModule.forChild([

      {
        path: 'etl',
        component: EtlComponent,
        children: [
          {
            path: '',
            component: TaskListComponent
          },
          {
            path: 'tasklist',
            component: TaskListComponent
          },
          {
            path: 'input-form',
            component: InputFormComponent
          }
        ]
      }

    ]),
  ],
  exports: [
    RouterModule
  ]
})
export class UploadRoutingModule {
}
