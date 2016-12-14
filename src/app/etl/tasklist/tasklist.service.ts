import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class TaskListService{
    private headers = new Headers({'Content-Type': 'application/json'});
    private BASE_URL = 'http://10.5.0.223:8090/TomcatTest';
    private TASKLIST_URL = this.BASE_URL + '/tasklist';
    private DELETETASK_URL = this.BASE_URL + '/delete-task';

    constructor(private http:Http){}

    getTasks():Promise<any>{
        return this.http.get(this.TASKLIST_URL)
                .toPromise()
                .then(response => response.json() || {})
                .catch(this.handleError);
    }

    delete(task: any): Promise<void> {
        return this.http.post(this.DELETETASK_URL, task['id'])
                .toPromise()
                .then(() => null)
                .catch(this.handleError);
}

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    }
}

