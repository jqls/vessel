import { Component, OnInit } from '@angular/core';
import {DataJSON} from "./data-types";
import {DataService} from "./data.service";

@Component({
  selector: 'app-task',
  templateUrl: './task-show.component.html',
  styleUrls: ['./task-show.component.sass']
})
export class TaskShowComponent implements OnInit {
  attributeName:any;
  dataJSON:DataJSON[];

  //获取任务列表zhaoli
  constructor(private dataService:DataService) {}
  ngOnInit() {
    this.dataService.requireTask().then((response: DataJSON[]) => {
      this.dataJSON = response;
      console.log(this.dataJSON);
    }).catch(this.handleError);
  }
  //获取下拉列表中选中的属性值--------------------------
  selectAttribute(event:any){
    this.attributeName=event.target.value;
    let [first,last] = this.attributeName.split('-');
    console.log(this.attributeName);
    console.log(first);
    console.log(last);
    //  return this.attributeName as DataJSON[];
    this.dataService.setData(first,last);
  }
  private handleError(error: any) {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }
}
