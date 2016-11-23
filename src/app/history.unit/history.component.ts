import {Component, OnInit} from "@angular/core";
import {HistoryService} from "./history.service";
import {Router} from "@angular/router";

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

    constructor(private historyService: HistoryService,
                private router: Router) {
        this.historyService.getHistory().then((response)=> {
            this.history = response.json();
        }).catch(()=> {
            console.warn("Get history failed.");
        });
    }

    ngOnInit() {

    }

    gotoDetail(taskName: string) {
        let link = ["/craft", {type: "reload", taskName: taskName}];
        this.router.navigate(link);
    }
}
