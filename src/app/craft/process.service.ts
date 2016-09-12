import {Injectable} from "@angular/core";
import {DataSourceNode} from "./drawboard.component/internal/drawboard.node";
import {
    DataSourceNodeType,
    ProcessNodeType,
    ProcessNodeTypeJSON,
    DataSourceNodeTypeJSON
} from "./drawboard.component/internal/drawboard.node-types";
import {Http} from "@angular/http";

@Injectable()
export class ProcessService {
    private URL;
    private ALL_SOURCES = "/sources";
    private ALL_PROCESSES = "/processes";

    // private dataSources: DataSourceNodeTypeJSON[] = [
    //     {
    //         "id": "1",
    //         "description": "鸢尾花数据集",
    //         "label": "鸢尾花数据集",
    //         'slug': "鸢尾花数据集",
    //         "parameters": [
    //             {
    //                 "label": "参数A",
    //                 "controlType": "text",
    //                 "val": "5",
    //             },
    //             {
    //                 "label": "参数B",
    //                 "controlType": "float",
    //                 "val": "1.0",
    //             }
    //         ]
    //     },
    //     {
    //         "id": "2",
    //         "description": "MySQL数据库表",
    //         "label": "MySQL数据库表",
    //         'slug': "MySQL数据库表",
    //         "parameters": [
    //             {
    //                 "label": "数据库地址",
    //                 "controlType": "text",
    //                 "val": "192.169.1.104",
    //             },
    //             {
    //                 "label": "数据库端口",
    //                 "controlType": "text",
    //                 "val": "3306",
    //             },
    //             {
    //                 "label": "数据库名称",
    //                 "controlType": "text",
    //                 "val": "DataSet",
    //             },
    //             {
    //                 "label": "表名",
    //                 "controlType": "text",
    //                 "val": "table1",
    //             },
    //             {
    //                 "label": "列号",
    //                 "controlType": "text",
    //                 "val": "1",
    //             }
    //         ]
    //     },
    //     {
    //         "id": "3",
    //         "description": "Postgres数据库表",
    //         "label": "Postgres数据库表",
    //         'slug': "Postgres数据库表",
    //         "parameters": [
    //             {
    //                 "label": "数据库地址",
    //                 "controlType": "text",
    //                 "val": "192.169.1.104",
    //             },
    //             {
    //                 "label": "数据库端口",
    //                 "controlType": "text",
    //                 "val": "3306",
    //             },
    //             {
    //                 "label": "数据库名称",
    //                 "controlType": "text",
    //                 "val": "DataSet",
    //             },
    //             {
    //                 "label": "表名",
    //                 "controlType": "text",
    //                 "val": "table1",
    //             },
    //             {
    //                 "label": "列号",
    //                 "controlType": "text",
    //                 "val": "1",
    //             }
    //         ]
    //     }
    // ];
    // private processes: ProcessNodeTypeJSON[] = [
    //     {
    //         'id': '1',
    //         'label': "朴素贝叶斯",
    //         'slug': "朴素贝叶斯",
    //         'description': 'naive 的贝叶斯算法',
    //         "parameters": [
    //             {
    //                 "label": "特征数",
    //                 "controlType": "text",
    //                 "val": "5",
    //             },
    //             {
    //                 "label": "学习率",
    //                 "controlType": "float",
    //                 "val": "1.0",
    //             },
    //             {
    //                 "label": "模型类型",
    //                 "controlType": "select",
    //                 "val": "0",
    //                 "options": [
    //                     "multi-nominal",
    //                     "bernoulli"
    //                 ],
    //             }
    //         ],
    //     },
    //     {
    //         'id': '2',
    //         'label': "tf-idf",
    //         'slug': "tf-idf",
    //         'description': '',
    //         "parameters": [
    //             {
    //                 "label": "参数A",
    //                 "controlType": "text",
    //                 "val": "5",
    //             },
    //             {
    //                 "label": "参数B",
    //                 "controlType": "float",
    //                 "val": "1.0",
    //             }
    //         ]
    //     },
    //     {
    //         'id': '3',
    //         'label': "关联分析",
    //         'slug': "关联分析",
    //         'description': '',
    //         "parameters": [
    //             {
    //                 "label": "参数A",
    //                 "controlType": "text",
    //                 "val": "5",
    //             },
    //             {
    //                 "label": "参数B",
    //                 "controlType": "float",
    //                 "val": "1.0",
    //             }
    //         ],
    //     }
    // ];
    private allData: any;

    getAll(URL:string) {
        if(this.allData == null){
            this.allData = this.http.get("app/json").toPromise();
        }
        return this.allData;
    }
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
                        )}

            )
            .catch(this.handleError);
    }

    getProcesses(URL):Promise<ProcessNodeType[]> {
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
                        )}

            )
            .catch(this.handleError);
    }

    newDataSource(): DataSourceNode {
        return null;
    }

    private handleError(error: any) {
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    }

    constructor(private http: Http) {
    }

}
