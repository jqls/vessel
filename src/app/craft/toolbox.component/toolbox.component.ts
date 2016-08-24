import {Component, OnInit} from "@angular/core";
import {DrawboardStatusService} from "../drawboard-status.service";
import {ProcessService} from "../process.service";
import {
  DataSourceNodeType,
  WorkflowNodeType,
  ProcessNodeType
} from "../drawboard.component/internal/drawboard.node-types";

@Component({
  moduleId: module.id,
  selector: 'app-toolbox',
  templateUrl: 'toolbox.component.html',
  styleUrls: ['toolbox.component.css']
})
export class ToolboxComponent implements OnInit {
  selectedNodeType: WorkflowNodeType = null;
  dataSourceTypes: DataSourceNodeType[];
  processesTypes: ProcessNodeType[];

  constructor(private drawboadStatus: DrawboardStatusService,
              private processService: ProcessService) {
    let self = this;
    this.drawboadStatus.bookSelectedNodeType((node: WorkflowNodeType)=> {
      self.selectedNodeType = node;
    });
    this.dataSourceTypes = processService.getDataSources();
    this.processesTypes = processService.getProcesses();
  }

  itemClicked(item: WorkflowNodeType) {
    if (this.selectedNodeType == item) {
      this.selectedNodeType = null;
      this.drawboadStatus.cancelSelectedNode();
    } else {
      this.selectedNodeType = item;
      this.drawboadStatus.setSelectedNodeType(item);
    }
  }

  itemDbClicked(item: {}) {

  }

  ngOnInit() {
  }

}
