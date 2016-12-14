import {Injectable} from '@angular/core';
import {Http, Response} from "@angular/http";
import {environment} from "../environments/environment";
import {SparkDataType, DatasetType, AlgorithmType, SubmitJson, NodeType} from "./share/json-types";
import {mydebug} from "./share/my-log";
import {Dataset, Algorithm, Processor} from "./share/data-types";
import {handleError} from "./share/my-handler";

@Injectable()
export class DataService {
  private debug_location: string = "DataService";
  private spark_data_URL: string;
  private spark_data: Promise<SparkDataType>;
  private spark_data_new: Promise<NodeType[]>;

  constructor(private http: Http) {
    this.spark_data_URL = environment.isMock ? environment.URL_Spark_mock : environment.URL_Spark1;
    mydebug(this.debug_location, "constructor", this.spark_data_URL);
    // this.getAll();//旧版
  }
/*
 getAll, getDatasets和getAlgorithms都是旧版所需
 */
  getAll(): void {
    //三元运算符
    this.spark_data = environment.isMock ?
      this.http.get(this.spark_data_URL).toPromise().then(response => {
        mydebug(this.debug_location, "getAll", JSON.stringify(response.json().data));
        return response.json().data as SparkDataType
      }).catch(handleError) :
      this.http.get(this.spark_data_URL).toPromise().then(response => {
        mydebug(this.debug_location, "getAll", JSON.stringify(response.json()));
        return response.json() as SparkDataType;
      }).catch(handleError);

  }

  getDatasets(): Promise<Dataset[]> {
    return this.spark_data
      .then(response => {
        mydebug(this.debug_location, "getDatasets", JSON.stringify(response.sources));
        return (response.sources)
          .map((datasetJSON: DatasetType): Dataset => new Dataset(datasetJSON))
      })
      .catch(handleError);
  }

  getAlgorithms(): Promise<Algorithm[]> {
    return this.spark_data
      .then(response => {
        mydebug(this.debug_location, "getAlgorithms", JSON.stringify(response.processes));
        return (response.processes)
          .map((algorithmJSON: AlgorithmType): Algorithm => new Algorithm(algorithmJSON))
      })
      .catch(handleError);
  }
  /*
  新方法
   */
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
    return this.http.get(`${environment.djangoServer}/workflow/mission/`).toPromise();
  }

  getDataByTaskName(taskName: string): Promise<SubmitJson> {

    console.log("taskName: " + taskName);
    return this.http.get(environment.URL_Spark_redraw + "taskName=" + taskName).toPromise().then(
      response => {
        mydebug(this.debug_location, "getDataByTaskName", JSON.stringify(response.json()));
        return response.json() as SubmitJson;
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
