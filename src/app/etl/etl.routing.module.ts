import {NgModule}     from '@angular/core';
import {RouterModule} from '@angular/router';

// import { InputFormRoutingModule } from './newtask/input-form-routing.module'

import {EtlComponent} from "./etl.component";
import {TaskListComponent} from "./tasklist/tasklist.component";
import {InputFormComponent} from "./newtask/input-form.component";


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
export class ETLRoutingModule {
}