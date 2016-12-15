import {Injectable} from "@angular/core";
import {DataSourceNode} from "./drawboard.component/internal/drawboard.node";
import {
    DataSourceNodeType,
    ProcessNodeType,
    ProcessNodeTypeJSON,
    DataSourceNodeTypeJSON
} from "./drawboard.component/internal/drawboard.node-types";
import {Http, Response} from "@angular/http";
import {SubmitJson} from "./data-type";


@Injectable()
export class ProcessService {
    //todo: @qiuwenkai 配置定义放到environment文件中去
    private URL_Spark = "http://10.5.0.222:8080/sendinformation/";
    //private URL_Spark = "http://10.5.0.222:8080/workflow/processor/";
    private History_URL = "http://10.5.0.222:8080/redraw?";
    private URL_Storm = null;
    private URL_Mapreduce = null;
    private sparkData: Promise<Response>;
    private stormData: Promise<Response>;
    private mapreduceData: Promise<Response>;

    public SPARKTYPE: number = 1;
    public STORMTYPR: number = 2;
    public MAPREDUCETYPE: number = 3;

    //测试用
    private DEBUG: boolean = true;
    private isMock: boolean = false;

    getAll(): void {
        console.log(this.URL_Spark);
        this.sparkData = this.http.get(this.URL_Spark).toPromise();
        console.log(this.sparkData.then(response => response.json()));
        //todo: 添加storm与mapreduce的数据获取
    }

    //todo： 暂时只有Spark数据获取用到此方法
    getDataSources(type: number): Promise<DataSourceNodeType[]> {
        let localData: Promise<Response> = null;
        switch (type) {
            case this.SPARKTYPE:
                localData = this.sparkData;
                break;
            case this.STORMTYPR:
                localData = this.stormData;
                break;
            case this.MAPREDUCETYPE:
                localData = this.mapreduceData;
                break;
            default:
                console.error("Error type in getting dataSource!");
        }
        //todo: 若Storm与Mapreduce以后添加相应数据类型，则需对返回进行修改
        if (this.isMock) {
            return localData
                .then(
                    response => {
                        if (this.DEBUG)
                            console.debug(response.json().data.sources);

                        return (response.json().data.sources as DataSourceNodeTypeJSON[])
                            .map(
                                (dataSourceJSON): DataSourceNodeType=> new DataSourceNodeType(dataSourceJSON)
                            )
                    }
                )
                .catch(this.handleError);
        }
        return localData
            .then(
                response => {
                    if (this.DEBUG)
                        console.debug(response.json().sources);

                    return (response.json().sources as DataSourceNodeTypeJSON[])
                        .map(
                            (dataSourceJSON): DataSourceNodeType=> new DataSourceNodeType(dataSourceJSON)
                        )
                }
            )
            .catch(this.handleError);

    }

    //todo： 暂时只有Spark数据获取用到此方法
    getProcesses(type: number): Promise<ProcessNodeType[]> {
        let localData: Promise<Response> = null;
        switch (type) {
            case this.SPARKTYPE:
                localData = this.sparkData;
                break;
            case this.STORMTYPR:
                localData = this.stormData;
                break;
            case this.MAPREDUCETYPE:
                localData = this.mapreduceData;
                break;
            default:
                console.error("Error type in getting Processes!");
        }
        //todo: 若Storm与Mapreduce以后添加相应数据类型，则需对返回进行修改
        if (this.isMock) {
            return localData
                .then(
                    response => {
                        if (this.DEBUG)
                            console.debug(JSON.stringify(response.json().data.processes));
                        return (response.json().data.processes as ProcessNodeTypeJSON[])
                            .map(
                                (processJSON): ProcessNodeTypeJSON=> new ProcessNodeType(processJSON)
                            )
                    }
                )
                .catch(this.handleError);
        }
        return localData
            .then(
                response => {
                    if (this.DEBUG)
                        console.debug(JSON.stringify(response.json()));
                    return (response.json().processes as ProcessNodeTypeJSON[])
                        .map((processJSON): ProcessNodeTypeJSON=> new ProcessNodeType(processJSON))
                }
            )
            .catch(this.handleError);
    }

    newDataSource(): DataSourceNode {
        return null;
    }

    getDataByTaskName(taskName: string):Promise<SubmitJson>{

        console.log("taskName: "+ taskName);
        return this.http.get(this.History_URL+"taskName="+ taskName).toPromise().then(
            response => {
                console.log("getDataByTaskName");
                return response.json() as SubmitJson;
            }
        ).catch(this.handleError);

    }
    private handleError(error: any) {
        console.error('An error occurred', error);
        console.error('An error message', error.message);
        return Promise.reject(error.message || error);
    }

    constructor(private http: Http) {
        if (this.isMock) {
            this.URL_Spark = "app/json";
        }
        this.getAll();
    }

}
