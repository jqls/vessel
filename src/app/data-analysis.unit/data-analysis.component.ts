import {Component, OnInit} from "@angular/core";
import "rxjs/add/operator/toPromise";
import {DataAnalysisService} from "./data-analysis.service";

@Component({
    selector: 'app-data-analysis',
    templateUrl: 'data-analysis.component.html',
    styleUrls: ['data-analysis.component.sass'],
    providers: [
        DataAnalysisService
    ]
})
export class DataAnalysisComponent implements OnInit {

    private session: string;

    constructor(private service: DataAnalysisService) {

    }

    ngOnInit() {

    }

}