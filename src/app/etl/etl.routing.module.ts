import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";
import {EtlComponent} from "./etl.component";
import {TaskListComponent} from "./tasklist/tasklist.component";
import {NewTaskComponent} from "./newtask/newtask.component";
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
            component: NewTaskComponent
          }
        ]
      }

    ]),
  ],
  exports: [
    RouterModule
  ]
})
export class ETLRoutingModule {
}
