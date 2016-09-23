import {Injectable} from "@angular/core";
import {Headers, Http, RequestMethod} from "@angular/http";


@Injectable()
export class SubmitService {
    private DEBUG = true;
    private URL_Spark = "http://10.5.0.224:8080/submit/";
    private URL_Storm = null;
    private URL_Mapreduce = null;

    constructor(private http: Http) {
    }

    submit(workflowJSON: string) {
        if (this.DEBUG)
            console.debug(`submit: ${workflowJSON}`);
        let headers = new Headers({
            'Content-Type': 'application/json'
        });
        //todo:
        return this.http
            .post(this.URL_Spark, workflowJSON, {headers: headers, method: RequestMethod.Post})
            .toPromise()
            .then(res => {
                console.log(res)
            })
            .catch(this.handleError);
    }

    submit4map(workflowJSON: string) {
        console.log(`submit: ${workflowJSON}`);
        let headers = new Headers({
            'Content-Type': 'application/json'
        });
        console.log(JSON.parse(workflowJSON).processes[0]);
        let request = {name:JSON.parse(workflowJSON).processes[0].label};
        console.log(JSON.stringify(request));
        return this.http
            .post("http://10.5.0.224:8080/submitMR/", JSON.stringify(request), {
                headers: headers,
                method: RequestMethod.Post
            })
            .toPromise()
            .then(res => {
                console.log(res)
            })
            .catch(this.handleError);
    }

    private handleError(error: any) {
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    }
}
