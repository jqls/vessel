import {Component, OnInit} from '@angular/core';
import {DataJSON} from "./data-types";
import {DataShowService} from "./data-show.service";
import {handleError} from "../my-handler";

@Component({
  selector: 'app-data-show',
  templateUrl: './data-show.component.html',
  styleUrls: ['./data-show.component.sass']
})
export class DataShowComponent implements OnInit {

  attributeName: any;
  dataJSON: DataJSON[];
  type: number = null;

  //获取任务列表zhaoli
  constructor(private dataShowService: DataShowService) {
  }

  ngOnInit() {
    this.dataShowService.requireTask().then((response: DataJSON[]) => {
      this.dataJSON = response;
      console.log(this.dataJSON);
    }).catch(handleError);
  }

  //获取下拉列表中选中的属性值--------------------------
  selectAttribute(event: any) {
    this.attributeName = event.target.value;
    let [first,last] = this.attributeName.split('-');
    //  return this.attributeName as DataJSON[];
    this.dataShowService.setData(first, last);
  }

  setType(type: number) {
    this.type = type;
    console.log("show:" + this.type);
  }
}
