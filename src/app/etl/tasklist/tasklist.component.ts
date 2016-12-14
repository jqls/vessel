import { Component, OnInit } from '@angular/core';
import {TaskListService} from "./tasklist.service";

@Component({
  selector: 'app-tasklist',
  templateUrl: './tasklist.component.html',
  styleUrls: ['./tasklist.component.sass']
})
export class TaskListComponent implements OnInit {

  task_list:Array<any> = null;
  cur_task:any = null;
  // task_status_map = ["正在运行", "已完成"];

  constructor(private taskListService: TaskListService){}

  get_tasks():void{
    this.taskListService
      .getTasks()
      .then(data => {
        // var tmp = JSON.parse(data);
        // var t_num = tmp.length;
        // if(t_num > 0){
        //   this.job_list = tmp;
        // }
        console.log(JSON.stringify(data));
        
        let task_num: number = data.length;
        console.log(task_num);
        this.task_list = data;
      });
  }

  delete(task: any): void {
    // alert('delete clicked!');
    this.taskListService
      .delete(task)
      .then(() => {
        // this.task_list = this.task_list.filter(h => h !== task);
        // if (this.cur_task === task) { this.cur_task = null; }
        console.log("Delete a task!");
        this.get_tasks();
      });
  }

  getCurTask(task:any){
    this.cur_task = task;
    // alert(this.cur_task['task_name']);
  }

  ngOnInit(){
    this.get_tasks();
    console.log("heheheheheeh");
  }
}
