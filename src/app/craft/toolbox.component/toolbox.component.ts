import {Component, OnInit} from "@angular/core";
import {DrawboardStatusService} from "../drawboard-status.service";
import {ProcessService} from "../process.service";
import {ProcessNode, DataSourceNode} from "../../shared/json-typedef";

@Component({
  moduleId: module.id,
  selector: 'app-toolbox',
  templateUrl: 'toolbox.component.html',
  styleUrls: ['toolbox.component.css']
})
export class ToolboxComponent implements OnInit {
  selectedNode: {} = null;
  dataSources: Array<DataSourceNode> = [];
  processes: Array<ProcessNode> = [];
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

  itemClicked(item: DataSourceNode|ProcessNode) {
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
