import {Component, OnInit} from '@angular/core';
import {Workflow_history} from "../../share/json-types";
import {DataService} from "../../data.service";
import {CraftService} from "../craft.service";
import {Router} from "@angular/router";
import {GlobalService} from "../../global.service";

@Component({
  selector: 'app-run-history',
  templateUrl: './run-history.component.html',
  styleUrls: ['./run-history.component.sass']
})
export class RunHistoryComponent implements OnInit {
  private history: {}[];
  private workflowID: number;

  constructor(private dataService: DataService,
              private craftService: CraftService,
              private router: Router,
              private globalService: GlobalService) {
    this.globalService.book_workflowID((id) => {
      this.workflowID = id;
    });
  }

  ngOnInit() {
    this.dataService.getMissionsList(this.workflowID).then((response) => {
      this.history = response.json();
      console.log(this.history);
    }).catch(() => {
      console.warn("Get history failed.");
    });
  }

  gotoDetail(record: Workflow_history) {
    this.craftService.setTaskName(record.name);
    this.globalService.mission_id = record.id;
    this.craftService.setReload(true);
    let link = ["/Experiment"];
    this.router.navigate(link);
  }
}
