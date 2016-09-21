import {Injectable} from "@angular/core";
import {Http} from "@angular/http";
import {environment} from "../environment";
import "rxjs/operator";

export type DatabaseInfo = {
    db_name: string
};

export type TableInfo = string

@Injectable()
export class DataAnalysisService {

    constructor(private http: Http) {

    }

    getAllDatabase(): Promise<DatabaseInfo[]> {
        return this.http.get(environment.dataAnalysis.allDatabase())
            .toPromise()
            .then(response => response.json().data as DatabaseInfo[])
    }

    getAllTable(databaseIndex: number): Promise<TableInfo[]> {
        return this.http.get(environment.dataAnalysis.allTables(databaseIndex))
            .toPromise()
            .then(response => response.json().data as TableInfo[])
    }

}
