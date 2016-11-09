import {Component, OnInit} from "@angular/core";
import {HistoryService} from "./history.service";

@Component({
    selector: 'app-history',
    templateUrl: 'history.component.html',
    styleUrls: ['history.component.sass'],
    providers: [
        HistoryService
    ]
})
export class HistoryComponent implements OnInit {

    history: [{}];

    constructor(private historyService: HistoryService) {
        this.historyService.getHistory().then((response)=> {
            this.history = response.json();
        }).catch(()=> {
            console.warn("Get history failed.");
        });
    }

    ngOnInit() {
    }

}
