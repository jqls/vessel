import {Injectable} from "@angular/core";
import {Http, Response} from "@angular/http";
import {environment} from "../environment";

@Injectable()
export class HistoryService {

    constructor(private http: Http) {
    }

    getHistory(): Promise<Response> {
        return this.http.get(`http://${environment.djangoServer}/get_history`).toPromise();
    }


}
