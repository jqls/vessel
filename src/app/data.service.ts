import {Injectable} from '@angular/core';
import {Http} from "@angular/http";
import {environment} from "../environments/environment";
import {SparkDataType, DatasetType, AlgorithmType} from "./share/json-types";
import {mydebug} from "./share/my-log";
import {Dataset, Algorithm} from "./share/data-types";
import {handleError} from "./share/my-handler";

@Injectable()
export class DataService {
  private debug_location: string = "DataService";
  private spark_data_URL: string;
  private spark_data: Promise<SparkDataType>;

  constructor(private http: Http) {
    this.spark_data_URL = environment.isMock ? environment.URL_Spark_mock : environment.URL_Spark;
    mydebug(this.debug_location, "constructor", this.spark_data_URL);
  }

  getAll(): void {
    //三元运算符
    this.spark_data = environment.isMock ?
      this.http.get(this.spark_data_URL).toPromise().then(response => {
        mydebug(this.debug_location, "getAll", JSON.stringify(response.json().data));
        return response.json().data as SparkDataType
      }) :
      this.http.get(this.spark_data_URL).toPromise().then(response => {
        mydebug(this.debug_location, "getAll", JSON.stringify(response.json()));
        return response.json() as SparkDataType;
      });

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
        mydebug(this.debug_location, "getAlgorithms", JSON.stringify(response.sources));
        return (response.processes)
          .map((algorithmJSON: AlgorithmType): Algorithm => new Algorithm(algorithmJSON))
      })
      .catch(handleError);
  }
}
