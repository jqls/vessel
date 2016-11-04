import { Injectable } from '@angular/core';
import {GlobalService} from "../../global.service";
import {DataJSON} from "./data-types";
import {Http} from "@angular/http";

@Injectable()
export class DataService {
  private data = [
    {
      "NAME": "衬衫",
      "VAL": "53"
    },
    {
      "NAME": "羊毛衫",
      "VAL": "20"
    },
    {
      "NAME": "雪纺衫",
      "VAL": "33"
    },
    {
      "NAME": "裤子",
      "VAL": "43"
    },
    {
      "NAME": "高跟鞋",
      "VAL": "28"
    },
    {
      "NAME": "袜子",
      "VAL": "29"
    }
  ];
  URL = "http://10.5.0.222:8080/visualization/?";
  constructor(private globalService:GlobalService,private http: Http) {

  }
  private handleError(error: any) {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }

  getData(){
    let flowid = this.globalService.getLastFLowID();
    let id = this.globalService.getLastID();
    let json = {
      flowID:"6",
      id:"4"
    };
    // console.log(this.URL+JSON.stringify(json));
    let response = "id="+json.id+'&'+'flowID='+json.flowID;
    // return this.http.get(this.URL+response).toPromise().then(
    //     response => {
    //       return (response.json() as DataJSON[]);
    //     }
    // ).catch(this.handleError);
    return Promise.resolve(this.data as DataJSON[]);
  }
}
