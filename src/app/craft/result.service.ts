import {Injectable} from "@angular/core";
import {BasicNode, ProcessNode, WorkflowNode} from "./drawboard.component/internal/drawboard.node";
import {ResultJSON} from "./result.component/internal/resultType";
import {Http} from "@angular/http";
import 'rxjs/add/operator/toPromise';

@Injectable()
export class ResultService {
    private URL_Spark = "app/results"; // URL to web api
    private URL_Storm = null;
    private URL_Mapreduce = null;

    public SPARKTYPE:number = 1;
    public STORMTYPR:number = 2;
    public MAPREDUCETYPE:number = 3;

    //todo： 改为http后删掉
    RESULTS:ResultJSON[] = [
            {id: '11', flowID: 1, result: 'Mr. Nice_1'},
            {id: '12', flowID: 2, result: 'Narco_2'},
            {id: '13', flowID: 3, result: 'Bombasto_3'},
            {id: '14', flowID: 4, result: 'Celeritas_4'},
            {id: '15', flowID: 5, result: 'Magneta_5'},
            {id: '16', flowID: 6, result: 'RubberMan_6'},
            {id: '17', flowID: 7, result: 'Dynama_7'},
            {id: '18', flowID: 8, result: 'Dr IQ_8'},
            {id: '19', flowID: 9, result: 'Magma_9'},
            {id: '10', flowID: 0, result: 'Tornado_0'}
        ];
    selectedNode: ProcessNode;
    subscribers: Array<(node: ProcessNode)=>void>;

    constructor(private http: Http) {
        this.subscribers = Array<(node: ProcessNode)=>void>();
    }

    bookService(bookFunction: (node: ProcessNode)=>void) {
        this.subscribers.push(bookFunction);
    }

    setSelectedNode(newNode: ProcessNode) {
        this.selectedNode = newNode;
        this.subscribers.forEach((s)=>s(newNode));
    }

    getResults(type: number):Promise<ResultJSON[]> {
        //todo: 改为http
        return Promise.resolve(this.RESULTS);

        // todo: 改为根据craft类型
        // let result = null;
        // switch (type){
        //     case this.MAPREDUCETYPE:
        //         result = this.http.get(this.URL_Spark)
        //             .toPromise()
        //             .then(response => response.json().data as ResultJSON[])
        //             .catch(this.handleError);
        //         break;
        //     default:
        //             console.error("Error type in getting Result!");
        // }
        // return result;

    }

    private handleError(error: any) {
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    }

    getResult(type:number, attributes:BasicNode) {
        //todo: 或许可以改为以?分隔请求参数的get方法
        let flowID = attributes.flowID;
        return this.getResults(type).then(results => results.find(result => result.flowID === flowID));
    }
}
