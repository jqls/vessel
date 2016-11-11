import { NgModule }     from '@angular/core';
import { RouterModule } from '@angular/router';

// import { InputFormRoutingModule } from './newtask/input-form-routing.module'
import { InputFormComponent }  from './newtask/input-form.component';
import { TaskListComponent }    from './tasklist/tasklist.component';
import { HdfsComponent } from './newtask/hdfs/hdfs.component';
import { HiveComponent } from './newtask/hive/hive.component';


@NgModule({
  imports: [
    RouterModule.forChild([
          {
            path: '',
            redirectTo: '/tasklist',
            pathMatch: 'full'
          },
          {
            path: 'tasklist',
            component: TaskListComponent
          },
          {
            path: 'input-form',
            component: InputFormComponent
          }
    ]),
  ],
  exports: [
    RouterModule
  ]
})
export class NavigatorRoutingModule {}