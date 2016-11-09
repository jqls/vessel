import {Injectable} from "@angular/core";
import {Http} from "@angular/http";
import {environment} from "../environment";

@Injectable()
export class DataAnalysisService {

    constructor(private http: Http) {
        // 获得session ID 和 csrf token，session ID
        this.http.get(`http://${environment.dataAnalysisServer}/context_initial/`).toPromise().then((response)=> {
            console.log(response.headers.toJSON());
            console.log("initial ok");
        });
    }

}
