import { Injectable } from '@angular/core';
import {GlobalService} from "../../global.service";
import {DataJSON} from "./data-types";
import {Http} from "@angular/http";

@Injectable()
export class DataService {
  id:string;
  label:string;
  URL = "http://10.5.0.222:8080/visualization/?";
  constructor(private globalService:GlobalService,private http: Http) {

  }
  private handleError(error: any) {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }

  // getData(){//师弟获取数据函数
  //   let flowid = this.globalService.getLastFLowID();
  //   let id = this.globalService.getLastID();
  //   let json = {
  //     flowID:"6",
  //     id:"4"
  //   };
  //   console.log(this.URL+JSON.stringify(json));
  //   let response = "id="+json.id+'&'+'flowID='+json.flowID;
  //   return this.http.get(this.URL+response).toPromise().then(
  //       response => {
  //         return (response.json() as DataJSON[]);
  //       }
  //   ).catch(this.handleError);
  //  //return Promise. resolve(this.data as DataJSON[]);
  // }


  requireData(){//根据下拉列表中选定的任务获取指定任务的 数据
    let dataUrl="http://10.5.0.222:8080/visualization/?";
    let taskName =this.globalService.getTaskName();
    console.log("requireData: "+taskName);
    //let selected=this.taskService.getAttribute();
    //let response = "taskName="+taskName+'&'+"id=1"+"&"+"label=histogram_1_6";

    let response="taskName="+taskName+'&'+"id="+this.id+"&"+"label="+this.label;
    return this.http.get(dataUrl+response)
      .toPromise()
      .then(response =>
        response.json() as DataJSON[]
      )
      .catch(this.handleError);
    //return Promise.resolve(this.data as DataJSON[]);
  }
  setData(id:string,label:string){
    this.id=id;
    this.label=label;
  }
  requireTask(){//获取数据库中的任务，添加到下拉列表中
    var taskUrl = "http://10.5.0.222:8080/sendresultinformation/?"
    let taskName =this.globalService.getTaskName();
    console.log("requireTask: "+this.URL+taskName);
    let response = "taskName="+taskName;
    return this.http.get(taskUrl+response).toPromise().then(
      response => {
        console.log(response);
        return (response.json()as DataJSON[]);

      }
    ).catch(this.handleError);

    //  return Promise.resolve(this.data as DataJSON[]);
  }
}
