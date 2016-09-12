import {Injectable} from "@angular/core";
import {BasicNode, ProcessNode, WorkflowNode} from "./drawboard.component/internal/drawboard.node";
import {ResultJSON} from "./result.component/internal/resultType";
import {Http} from "@angular/http";
import 'rxjs/add/operator/toPromise';
import {RESULTS} from "../mock-result";

@Injectable()
export class ResultService {
    private resultsUrl = 'app/results';  // URL to web api

    RESULTS:ResultJSON[] = [
            {id: '11', flowID: 1, result: 'Mr. Nice'},
            {id: '12', flowID: 2, result: 'Narco'},
            {id: '13', flowID: 3, result: 'Bombasto'},
            {id: '14', flowID: 4, result: 'Celeritas'},
            {id: '15', flowID: 5, result: 'Magneta'},
            {id: '16', flowID: 6, result: 'RubberMan'},
            {id: '17', flowID: 7, result: 'Dynama'},
            {id: '18', flowID: 8, result: 'Dr IQ'},
            {id: '19', flowID: 9, result: 'Magma'},
            {id: '10', flowID: 0, result: 'Tornado'}
        ];
    selectedNode: ProcessNode;
    subscribers: Array<(node: ProcessNode)=>void>;

    constructor(private http: Http) {
        this.subscribers = Array<(node: ProcessNode)=>void>();
    }

    bookService(bookFunction: (node: WorkflowNode)=>void) {
        this.subscribers.push(bookFunction);
    }

    setSelectedNode(newNode: ProcessNode) {
        this.selectedNode = newNode;
        this.subscribers.forEach((s)=>s(newNode));
    }

    getResults():Promise<ResultJSON[]> {

        return Promise.resolve(this.RESULTS);
        // return this.http.get(this.resultsUrl)
        //     .toPromise()
        //     .then(response => response.json().data as ResultJSON[])
        //     .catch(this.handleError);
    }

    private handleError(error: any) {
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    }

    getResult(attributes:BasicNode) {
        let flowID = attributes.flowID;
        return this.getResults().then(results => results.find(result => result.flowID === flowID));
    }
}
