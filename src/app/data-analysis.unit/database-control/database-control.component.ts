import {Component, OnInit} from "@angular/core";
import {DataAnalysisService, DatabaseInfo, TableInfo} from "../data-analysis.service";
import "rxjs/operator";
import {FormGroup, FormBuilder} from "@angular/forms";


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
    errorMessage: string;
    requestInfo: DatabaseRequest = {
        selectedDatabaseIndex: -1
    };

    controlForm: FormGroup;

    constructor(private service: DataAnalysisService, private formBuilder: FormBuilder) {
        this.controlForm = this.formBuilder.group({
            database: [0],
            table: [''],
        });
        let self = this;
        this.controlForm.controls['allowedDatabase'].valueChanges
            .debounceTime(50)
            .subscribe(dbIndex=> {
                console.log(dbIndex);
                self.requestInfo.selectedDatabaseIndex = dbIndex;
                self.getAllTable();
            });
        this.getAllDatabase();
    }


    getAllDatabase() {
        let self = this;
        this.service.getAllDatabase()
            .subscribe(
                allowedDatabase => self.allowedDatabase = allowedDatabase,
                error => self.errorMessage = <any>error);
    }

    getAllTable() {
        let self = this;
        console.log("select:", self.requestInfo.selectedDatabaseIndex);
        this.service.getAllTable(self.requestInfo.selectedDatabaseIndex)
            .subscribe(
                allowedTable => self.allowedTable = allowedTable,
                error => self.errorMessage = <any>error);
    }

    ngOnInit() {
    }

}
