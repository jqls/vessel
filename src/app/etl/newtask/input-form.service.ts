import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

@Injectable()
export class InputFormService{
    private headers = new Headers({'Content-Type': 'text/json'});
    // private webUrl_rdbLogin = 'app/rdb_login';
    // private webUrl_tableColumn = 'app/tables_columns';
    // private webUrl_hdfsAddr = 'app/hdfs_add';
    // private webUrl_hdfsDir = 'app/hdfs_dir';
    private BASE_URL = 'http://10.5.0.223:8090/TomcatTest';
    private SUBMIT_URL = this.BASE_URL + '/submit-task';

    constructor(private http:Http){}

    postResult(result:any):Promise<string>{
         return this.http.post(this.SUBMIT_URL, JSON.stringify(result))
                .toPromise()
                .then(res => res.json() || {})
                .catch(this.handleError);
    }

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    }
}

