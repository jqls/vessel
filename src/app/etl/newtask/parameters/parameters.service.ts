import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import {environment} from "../../../../environments/environment";

@Injectable()
export class ParameterService{
    private headers = new Headers({'Content-Type': 'text/json'});
    private webUrl_rdbLogin = environment.URL_ETL_newtask_rdb;
    // private webUrl_tableColumn = 'app/tables_columns';
    // private webUrl_hdfsAddr = 'app/hdfs_add';
    private webUrl_hdfsDir = environment.URL_ETL_newtask_hdfs;
    // private webUrl_result = 'app/result';

    constructor(private http:Http){}

    getHdfsDir():Promise<any>{
        return this.http.get(this.webUrl_hdfsDir)
                .toPromise()
                .then(res => res.json() || {})
                .catch(this.handleError);
    }

    connect_rdb(form: any):Promise<string>{
        console.log("form content");
        console.log(form);
        console.log(JSON.stringify(form));
        return this.http.post(this.webUrl_rdbLogin, JSON.stringify(form))//传递的是form的string字符串格式
                .toPromise()
                .then(res => res.json()||{})
                .catch(this.handleError);
        // return this.http.get(this.webUrl_rdbLogin)
        //                 .toPromise()
        //                 .then(res => res.json() || {})
        //                 .catch(this.handleError);
    }

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    }
}

