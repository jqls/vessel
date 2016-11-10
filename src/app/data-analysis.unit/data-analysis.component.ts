import {Component, OnInit} from "@angular/core";
import "rxjs/add/operator/toPromise";

@Component({
    selector: 'app-data-analysis',
    templateUrl: 'data-analysis.component.html',
    styleUrls: ['data-analysis.component.sass'],
})
export class DataAnalysisComponent implements OnInit {

    private session: string;

    constructor() {

    }

    ngOnInit() {

    }

}