import {Component, OnInit} from '@angular/core';
import {DrawboardStatusService} from "../drawboard-status.service";
import {ProcessService} from "../process.service";

@Component({
  moduleId: module.id,
  selector: 'app-toolbox',
  templateUrl: 'toolbox.component.html',
  styleUrls: ['toolbox.component.css']
})
export class ToolboxComponent implements OnInit {
  selectedNode: {} = null;
  dataSources: Array<{}> = [];
  processes: Array<{}> = [];
  displayInfomation: boolean = false;

  constructor(private drawboadStatus: DrawboardStatusService,
              private processService: ProcessService) {
    let self = this;
    this.drawboadStatus.bookSelectedNode((node: {})=> {
      self.selectedNode = node;
    });
    this.dataSources = processService.getDataSources();
    this.processes = processService.getProcesses();
  }

  itemClicked(item: {}) {
    if (this.selectedNode == item) {
      this.selectedNode = null;
      this.drawboadStatus.cancelSelectedNode();
    } else {
      this.selectedNode = item;
      this.drawboadStatus.setSelectedNode(item);
    }
  }

  itemDbClicked(item: {}) {

  }

  ngOnInit() {
  }

}
