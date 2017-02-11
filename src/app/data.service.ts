import {Injectable} from '@angular/core';
import {Http, Response} from "@angular/http";
import {environment} from "../environments/environment";
import {NodeType, Workflow_data_all} from "./share/json-types";
import {mydebug} from "./share/my-log";
import {Processor} from "./share/data-types";
import {handleError} from "./share/my-handler";

@Injectable()
export class DataService {
  get spark_data(): NodeType[] {
    return this._spark_data;
  }
  private debug_location: string = "DataService";
  private spark_data_URL: string;
  private spark_data_new: Promise<NodeType[]>;
  private _spark_data:NodeType[];

  constructor(private http: Http) {
    this.spark_data_URL = environment.isMock ? environment.URL_Spark_mock : environment.URL_Spark;
    mydebug(this.debug_location, "constructor", this.spark_data_URL);
  }

  getNodeInfo():Promise<Processor[]>{
    //三元运算符
    this.spark_data_new = environment.isMock ?
      this.http.get(this.spark_data_URL).toPromise().then(response => {
        mydebug(this.debug_location, "getNodeInfo", JSON.stringify(response.json().data));
        return response.json().data as NodeType[]
      }).catch(handleError) :
      this.http.get(this.spark_data_URL).toPromise().then(response => {
        mydebug(this.debug_location, "getNodeInfo", JSON.stringify(response.json()));
        return response.json() as NodeType[];
      }).catch(handleError);

    return this.spark_data_new.then(response => {
      this._spark_data = response;
      return (response)
        .map((nodeType: NodeType): Processor => new Processor(nodeType))
    })
      .catch(handleError);
  }
  getExperimentsList(): Promise<Response> {
    return this.http.get(environment.URL_Spark_Workflow_History).toPromise();
  }
  getMissionsList(workflow_id: number): Promise<Response> {
    return this.http.get(environment.URL_Spark_RUN_HISTORY+workflow_id).toPromise();
  }

  getDataByFlowID(workflow_id: number): Promise<Workflow_data_all> {

    console.log("workflow_id: " + workflow_id);
    if(environment.isMock){
      return this.http.get(environment.URL_Spark_redraw_mock).toPromise().then(res=>{
        mydebug(this.debug_location, "getDataByFlowID", JSON.stringify(res.json().data));
        return res.json().data as Workflow_data_all;
      }).catch(handleError);
    }
    return this.http.get(environment.URL_Spark_redraw + workflow_id).toPromise().then(
      response => {
        mydebug(this.debug_location, "getDataByFlowID", JSON.stringify(response.json()));
        return response.json() as Workflow_data_all;
      }
    ).catch(handleError);

  }
}
