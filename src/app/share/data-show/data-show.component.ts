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
  topolopyShow:boolean=false;//控制拓扑图模态框的隐藏显示
  showIp:string=null;
  showNum:number=null;
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

  modalShow(){//控制拓扑图模态框的隐藏显示
    if(this.topolopyShow==true)
        this.topolopyShow=false;
    else
      this.topolopyShow=true;
  }
  setNum(){
    //用于传递拓扑图需要显示的IP和深度值
    this.dataShowService.topologyIp=this.showIp;
    this.dataShowService.topologyNum=this.showNum;
    this.setType(3);
  }

}
