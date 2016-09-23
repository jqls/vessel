import { Injectable } from '@angular/core';
import {GlobalService} from "../../global.service";
import {DataJSON} from "./data-types";
import {Http} from "@angular/http";

@Injectable()
export class DataService {

  URL = "http://10.5.0.224:8080/visualization/?";
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
    return this.http.get(this.URL+response).toPromise().then(
        response => {
          return (response.json() as DataJSON[]);
        }
    ).catch(this.handleError);
  }
}
