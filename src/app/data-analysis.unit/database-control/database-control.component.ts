import {Component, OnInit} from "@angular/core";
import {DataAnalysisService, DatabaseInfo, TableInfo} from "../data-analysis.service";
import "rxjs/operator";
import {FormBuilder} from "@angular/forms";


type DatabaseRequest = {
    selectedDatabaseIndex: number;
}

@Component({
    selector: 'app-database-control',
    templateUrl: './database-control.component.html',
    styleUrls: ['./database-control.component.css'],
    providers: [
        DataAnalysisService,
    ]
})
export class DatabaseControlComponent implements OnInit {

    allowedDatabase: DatabaseInfo[] = [];
    allowedTable: TableInfo[] = [];
    requestInfo: DatabaseRequest = {
        selectedDatabaseIndex: -1
    };

    constructor(private service: DataAnalysisService, private formBuilder: FormBuilder) {
    }


    getAllDatabase() {
        this.service.getAllDatabase()
            .then(allowedDatabase=> this.allowedDatabase = allowedDatabase);
    }

    getAllTable() {
        let self = this;
        console.log("select:", self.requestInfo.selectedDatabaseIndex);
        this.service.getAllTable(self.requestInfo.selectedDatabaseIndex)
            .then(allowedTable => self.allowedTable = allowedTable);
    }

    ngOnInit() {
        this.getAllDatabase();
    }

}
