import {Component, OnInit} from "@angular/core";
import "rxjs/add/operator/toPromise";
import {environment} from "../environment";
import {DomSanitizer, SafeUrl} from "@angular/platform-browser";

@Component({
    selector: 'app-data-analysis',
    templateUrl: 'data-analysis.component.html',
    styleUrls: ['data-analysis.component.sass'],
})
export class DataAnalysisComponent implements OnInit {

    private session: string;
    private remoteURL: SafeUrl;

    constructor(private sanitizer: DomSanitizer) {
        this.remoteURL = sanitizer.bypassSecurityTrustResourceUrl(`http://${environment.dataAnalysisServer}/`);
    }

    ngOnInit() {

    }

}