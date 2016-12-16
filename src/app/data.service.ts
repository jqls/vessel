import {Injectable} from '@angular/core';
import {Http, Response} from "@angular/http";
import {environment} from "../environments/environment";
import {NodeType, SubmitType} from "./share/json-types";
import {mydebug} from "./share/my-log";
import {Processor} from "./share/data-types";
import {handleError} from "./share/my-handler";

@Injectable()
export class DataService {
  private debug_location: string = "DataService";
  private spark_data_URL: string;
  private spark_data_new: Promise<NodeType[]>;

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
      return (response)
        .map((nodeType: NodeType): Processor => new Processor(nodeType))
    })
      .catch(handleError);
  }
  getExperimentsList(): Promise<Response> {
    return this.http.get(environment.djangoServer+'/workflow/mission/0').toPromise();
  }

  getDataByTaskName(taskName: string): Promise<SubmitType> {

    console.log("taskName: " + taskName);
    return this.http.get(environment.URL_Spark_redraw + "taskName=" + taskName).toPromise().then(
      response => {
        mydebug(this.debug_location, "getDataByTaskName", JSON.stringify(response.json()));
        return response.json() as SubmitType;
      }
    ).catch(handleError);

  }

  getSocketAddress(taskName: string, flowID: string) {

    return this.http.get(environment.URL_Spark_log + "taskName=" + taskName + "&flowID=" + flowID).toPromise().then(response => {
      mydebug(this.debug_location, "getSocketAddress", JSON.stringify(response.json()));
      return response.json();
    });
  }
}
