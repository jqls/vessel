import { Component, OnInit, Input } from '@angular/core';
import { DataJSON } from './data-types';
import { DataShowService } from './data-show.service';
import { handleError } from '../my-handler';
import { environment } from "../../../environments/environment";
@Component({
  selector: 'app-data-show',
  templateUrl: './data-show.component.html',
  styleUrls: ['./data-show.component.sass']
})
export class DataShowComponent implements OnInit {
  @Input() visualization: boolean;
  topolopyShow = false; // 控制拓扑图模态框的隐藏显示
  showIp: string = null;
  showNum: number = null;
  dataJSON: Promise<DataJSON[]>;
  datas: DataJSON[];
  type: number = null;
  imgURL: string = null; // = 'http://10.5.0.222:8082/1-1-2-1-1.png';
  title: string;

  formData = new FormData();

  // 获取任务列表zhaoli
  constructor(private dataShowService: DataShowService) {
    let info = dataShowService.getInfo();
    this.title = info.flow_id + '-' + info.mission_id + '-' + info.processor_id + '-' + info.workflow_id + '-' + info.port_id;
  }

  ngOnInit() {
    if (this.visualization) {
      this.dataJSON = this.dataShowService.requireData().then((response: String[]) => {
        console.log(response);
        let dataJSON = response.map(item => {
          let str = item.split(',');
          return {
            NAME: str[0],
            VAL: str[1]
          };
        });
        this.datas = dataJSON;
        console.log(dataJSON);
        return dataJSON;
      }).catch(handleError);
    } else {
      this.dataJSON = this.dataShowService.requireData().then((response: String[]) => {
        console.log(response);
        let dataJSON = response.map(item => {
          let str = item.split(',');
          return {
            NAME: 'null',
            table_value: str
          };
        });
        this.datas = dataJSON;
        console.log(dataJSON);
        return dataJSON;
      }).catch(handleError);
    }

  }


  setType(type: number) {
    this.type = type;
    console.log('show:' + this.type);
  }

  modalShow() {// 控制拓扑图模态框的隐藏显示
    if (this.topolopyShow === true) {
      this.topolopyShow = false;
      this.setType(3);
    } else {
      this.topolopyShow = true;
    }
  }

  setNum() {
    // 用于传递拓扑图需要显示的IP和深度值
    this.dataShowService.topologyIp = this.showIp;
    this.dataShowService.topologyNum = this.showNum;
    // this.setType(3);
  }

  changeListener(event): void {
    this.postFile(event.target);
  }

  postFile(inputValue: any): void {// 获取文件
    this.formData.append('file', inputValue.files[0]);
    console.log(inputValue.files[0]);
    console.log(this.formData);
  }

  sendFile() {
    let URL_File = environment.URL_VISUAL_CUSTOME + this.title + '/';
    console.log(URL_File);
    let xhr = new XMLHttpRequest();
    xhr.open('POST', URL_File, true);
    xhr.send(this.formData);
    console.log(this.formData);
    xhr.onload = () => {
      if (xhr.status === 200) {
        console.log(xhr.responseText);
        let res = JSON.parse(xhr.responseText);
        this.imgURL = res['picture'];
      }
    };
  }
}
