import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class TaskListService{
    private headers = new Headers({'Content-Type': 'application/json'});
    private webUrl = 'app/tasklist';

    constructor(private http:Http){}

    getTasks():Promise<any>{
        return this.http.get(this.webUrl)
                .toPromise()
                .then(response => response.json().data)
                .catch(this.handleError);
    }

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    }
}

