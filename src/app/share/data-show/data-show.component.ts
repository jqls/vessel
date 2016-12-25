import {Component, OnInit, Input} from '@angular/core';
import {DataJSON} from "./data-types";
import {DataShowService} from "./data-show.service";
import {handleError} from "../my-handler";

@Component({
  selector: 'app-data-show',
  templateUrl: './data-show.component.html',
  styleUrls: ['./data-show.component.sass']
})
export class DataShowComponent implements OnInit {
  @Input() visualization:boolean;

  dataJSON: Promise<DataJSON[]>;
  datas: DataJSON[];
  type: number = null;

  //获取任务列表zhaoli
  constructor(private dataShowService: DataShowService) {
  }

  ngOnInit() {
    if(this.visualization){
      this.dataJSON = this.dataShowService.requireData().then((response: String[]) => {
        console.log(response);
        let dataJSON = response.map(item=>{
          let str = item.split(",");
          return {
            NAME: str[0],
            VAL:str[1]
          }
        });
        this.datas = dataJSON;
        console.log(dataJSON);
        return dataJSON;
      }).catch(handleError);
    }else{
      this.dataJSON = this.dataShowService.requireData().then((response: String[]) => {
        console.log(response);
        let dataJSON = response.map(item=>{
          let str = item.split(",");
          return {
            NAME: "null",
            table_value: str
          }
        });
        this.datas = dataJSON;
        console.log(dataJSON);
        return dataJSON;
      }).catch(handleError);
    }

  }


  setType(type: number) {
    this.type = type;
    console.log("show:" + this.type);
  }
}
