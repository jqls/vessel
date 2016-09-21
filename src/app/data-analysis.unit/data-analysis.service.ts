import {Injectable} from "@angular/core";
import {Http, Response} from "@angular/http";
import {environment} from "../environment";
import {Operator} from "rxjs";
import {Observable} from "rxjs";

export type DatabaseInfo = {
    db_name: string
};

export type TableInfo = string

@Injectable()
export class DataAnalysisService {

    constructor(private http: Http) {
    }

    private static handleError(error: any) {
        let errMsg = (error.message) ? error.message :
            error.status ? `${error.status} - ${error.statusText}` : 'Server error';
        console.error(errMsg);
        return Observable.throw(errMsg);
    }

    getAllDatabase(): Observable<DatabaseInfo[]> {
        return this.http.get(environment.dataAnalysis.allDatabase())
            .map((res: Response) => res.json() || [])
            .catch(DataAnalysisService.handleError);
    }

    getAllTable(databaseIndex: number): Observable<TableInfo[]> {

        return this.http.get(environment.dataAnalysis.allTables(databaseIndex))
            .map((res)=>res.json() || [])
            .catch(DataAnalysisService.handleError);
    }

}
