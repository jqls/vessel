import {Injectable} from "@angular/core";
import {DataSourceNode} from "./drawboard.component/internal/drawboard.node";
import {
    DataSourceNodeType,
    ProcessNodeType,
    ProcessNodeTypeJSON,
    DataSourceNodeTypeJSON
} from "./drawboard.component/internal/drawboard.node-types";
import {Http} from "@angular/http";
import "rxjs/add/operator/toPromise";

@Injectable()
export class ProcessService {
    private URL;
    private ALL_SOURCES = "/sources";
    private ALL_PROCESSES = "/processes";
    private allData: any;


    getAll(URL: string) {
        if (this.allData == null) {
            //noinspection TypeScriptUnresolvedFunction
            this.allData = this.http.get("http://10.5.0.224:8080/sendinformation/").toPromise();
        }
        return this.allData;
    }

    //noinspection TypeScriptUnresolvedVariable
    getDataSources(URL): Promise<DataSourceNodeType[]> {
        //todo: change to $http
        // return this.dataSources.map((dataSourceJSON): DataSourceNodeType=> {
        //     return new DataSourceNodeType(dataSourceJSON);
        // });
        return this.getAll(URL)
            .then(
                response => {
                    console.log(response.json().data.sources);
                    return (response.json().data.sources as DataSourceNodeTypeJSON[])
                        .map(
                            (dataSourceJSON): DataSourceNodeType=> new DataSourceNodeType(dataSourceJSON)
                        )
                }
            )
            .catch(this.handleError);
    }

    //noinspection TypeScriptUnresolvedVariable
    getProcesses(URL): Promise<ProcessNodeType[]> {
        //todo: change to $http
        // return this.processes.map((processJSON): ProcessNodeType=> {
        //   return new ProcessNodeType(processJSON);
        // });//this.HOST + ":" + this.PORT+"
        return this.getAll(URL)
            .then(
                response => {
                    console.log(JSON.stringify(response.json()));
                    return (response.json().data.processes as ProcessNodeTypeJSON[])
                        .map(
                            (processJSON): ProcessNodeTypeJSON=> new ProcessNodeType(processJSON)
                        )
                }
            )
            .catch(this.handleError);
    }

    newDataSource(): DataSourceNode {
        return null;
    }

    private handleError(error: any) {
        console.error('An error occurred', error);
        //noinspection TypeScriptUnresolvedVariable
        return Promise.reject(error.message || error);
    }

    constructor(private http: Http) {
    }

}
