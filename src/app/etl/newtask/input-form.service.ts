import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

@Injectable()
export class InputFormService{
    private headers = new Headers({'Content-Type': 'application/json'});
    private webUrl_rdbLogin = 'app/rdb_login';
    private webUrl_tableColumn = 'app/tables_columns';
    private webUrl_hdfsAddr = 'app/hdfs_add';
    private webUrl_hdfsDir = 'app/hdfs_dir';
    private webUrl_result = 'app/result';

    constructor(private http:Http){}

    getHdfsDir():Promise<any>{
        return this.http.get(this.webUrl_hdfsDir)
                .toPromise()
                .then(res => res.json().data || {})
                .catch(this.handleError);
    }

    getTablesAndColumns():Promise<any>{
        return this.http.get(this.webUrl_tableColumn)
                .toPromise()
                .then(response => response.json().data)
                .catch(this.handleError);
    }

    // connect_rdb():Promise<any>{
    //     return this.http
    //             .get(this.webUrl2)
    //             .toPromise()
    //             .then(response => response.json().data)
    //             .catch(this.handleError);
    // }

    // connect_rdb_test(name:string):Promise<any>{
    //     return this.http
    // .post(this.webUrl2, JSON.stringify({rdb_addr:'addr', name:name, pswd:'pswd'}), {headers: this.headers})
    // .toPromise()
    // .then(res => res.json().data)
    // .catch(this.handleError);
    // }

    connect_rdb_three(rdb_addr:string, name:string, pswd:string):Promise<string>{
        //在web-API的情况下post没有response,在实际交互时使用下边的注释代码
        // return this.http
        //         .post(this.webUrl2, JSON.stringify({rdb_addr,name,pswd}), {headers: this.headers})
        //         .toPromise()
        //         .then(res => res.json().data||{})
        //         .catch(this.handleError);
        this.http
            .post(this.webUrl_rdbLogin, JSON.stringify({rdb_addr,name,pswd}), {headers: this.headers});
        return this.http.get(this.webUrl_tableColumn)
                .toPromise()
                .then(res => res.json().data||{})
                .catch(this.handleError);
    }

    connect_noSql(hdfs_addr:string):Promise<string>{
        this.http.post(this.webUrl_hdfsAddr, JSON.stringify({hdfs_addr}), {headers: this.headers});
            // .toPromise()
            // .then()
            // .catch(this.handleError);
        return this.http.get(this.webUrl_hdfsDir)
                .toPromise()
                .then(res => res.json().data || {})
                .catch(this.handleError);
    }

    postResult(result:any):Promise<any>{
        return this.http
                .post(this.webUrl_result, result, {headers:this.headers})
                .toPromise()
                .then(res =>{

                })
                .catch(this.handleError);
    }

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    }
}

