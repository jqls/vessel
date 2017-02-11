import {Injectable} from '@angular/core';
import {GlobalService} from "../../global.service";
import {handleError} from "../my-handler";
import {DataJSON} from "./data-types";
import {Http} from "@angular/http";
import {environment} from "../../../environments/environment";

@Injectable()
export class DataShowService {
  topologyIp:string
  topologyNum:number;
  id: string;
  label: string;
  private workflow_id: number;

  constructor(private globalService: GlobalService, private http: Http) {
    this.globalService.book_workflowID((id) => {
      this.workflow_id = id
    });
  }


  requireData() {//根据下拉列表中选定的任务获取指定任务的 数据
    let workflow_id = this.workflow_id;
    let mission_id = this.globalService.mission_id;
    let processor_id = this.globalService.processor_id;
    let flow_id = this.globalService.flow_id;
    let port_id = this.globalService.port_id;
    console.log([workflow_id,mission_id,processor_id,flow_id,port_id]);
    if (workflow_id==null || mission_id==null || processor_id==null || flow_id==null || port_id==null) {
      console.warn("error task! Visualise Parameter is not enough");
      if (!environment.isMock)
        return Promise.reject("invalid parameters");
    }

    let URL = environment.isMock ?
      "app/visualise" :
      environment.URL_Spark_visualisation + workflow_id + '-' + mission_id + '-' + processor_id + '-' + flow_id + '-' + port_id + '-' + 0;
    console.log("requireData: " + URL);
    return this.http.get(URL)
      .toPromise()
      .then(response => {
          return environment.isMock ? response.json().data as string[] : response.json() as string[];
        }
      ).catch(handleError);
  }
}
