import { Component, OnInit } from '@angular/core';
import {TaskListService} from "./tasklist.service";

@Component({
  selector: 'app-tasklist',
  templateUrl: './tasklist.component.html',
  styleUrls: ['./tasklist.component.sass']
})
export class TaskListComponent implements OnInit {

  job_list:Array<any> = null;
  cur_task:any = null;

  flat_job_id = null;

  constructor(private taskListService: TaskListService){}

  get_tasks():void{
    this.taskListService
      .getTasks()
      .then(data => {
        var tmp = JSON.parse(data);
        var t_num = tmp.length;
        if(t_num > 0){
          this.job_list = tmp;
        }
      });
  }

  delete(task: any): void {
    // alert('delete clicked!');
    this.taskListService
      .delete(task)
      .then(() => {
        this.job_list = this.job_list.filter(h => h !== task);
        if (this.cur_task === task) { this.cur_task = null; }
        // alert(this.task_list.length);
        // alert(this.task_list[0]['task_name']);
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
