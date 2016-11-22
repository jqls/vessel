import {Component, OnInit} from '@angular/core';
import { TaskListService } from './tasklist.service'

@Component({
    selector: 'tasklist',
    templateUrl: './tasklist.component.html',
    styleUrls: [ './tasklist.component.css' ],
    providers: [TaskListService]
})
export class TaskListComponent implements OnInit{
    task_list:Array<any> = null;
    cur_task:any = null;

    constructor(private taskListService: TaskListService){}

    get_tasks():void{
        this.taskListService
            .getTasks()
            .then(data => {
                var tmp = JSON.parse(data);
                var t_num = tmp.length;
                if(t_num > 0){
                    this.task_list = tmp;
                }
            });
    }
    
    getCurTask(task:any){
        this.cur_task = task;
        // alert(this.cur_task['task_name']);
    }

    ngOnInit(){
        this.get_tasks();
    }
}