import {Injectable} from "@angular/core";
import {Response, Http} from "@angular/http";
import {environment} from "../environment";

@Injectable()
export class HistoryService {

    constructor(private http: Http) {
    }


    getHistory(): Promise<Response> {
        return this.http.get(`${environment.djangoServer}/get_history/`).toPromise();
    }

}
