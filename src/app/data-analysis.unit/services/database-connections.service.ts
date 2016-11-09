import {Injectable} from "@angular/core";
import {Http, Response} from "@angular/http";
import {environment} from "../../environment";

@Injectable()
export class DatabaseConnectionsService {

    constructor(private http: Http) {
    }

    promiseConnections(): Promise<Response> {
        return this.http.get(`http://${environment.dataAnalysisServer}/rest/connections/?format=json`).toPromise();
    }

}
