import {Injectable} from "@angular/core";
import {BasicNode, ProcessNode, WorkflowNode} from "./drawboard.component/internal/drawboard.node";
import {ResultJSON} from "./result.component/internal/resultType";
import {Http} from "@angular/http";
import 'rxjs/add/operator/toPromise';
import {RESULTS} from "../mock-result";

@Injectable()
export class ResultService {
    private resultsUrl = 'app/results';  // URL to web api

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

        // return Promise.resolve(RESULTS);
        return this.http.get(this.resultsUrl)
            .toPromise()
            .then(response => response.json().data as ResultJSON[])
            .catch(this.handleError);
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
