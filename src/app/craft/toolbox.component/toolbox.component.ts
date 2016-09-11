import {Component, OnInit} from "@angular/core";
import {DrawboardStatusService} from "../drawboard-status.service";
import {ProcessService} from "../process.service";
import {
  DataSourceNodeType,
  ProcessNodeType,
  WorkflowNodeType
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
  processesTypes: any;

  constructor(private drawboadStatus: DrawboardStatusService,
              private processService: ProcessService) {
    let self = this;
    this.drawboadStatus.bookSelectedNodeType((node: WorkflowNodeType)=> {
      self.selectedNodeType = node;
    });
    this.dataSourceTypes = this.processService.getDataSources();
    console.log(1);
    this.processService.getProcesses("http://10.5.0.224:8080/sendinformation/").then(processesTypes => {
      this.processesTypes = processesTypes;
      console.log(3);
      console.log(processesTypes);
      console.log(this.processesTypes);
    });
  }

  itemClicked(item: WorkflowNodeType) {
    if (this.selectedNodeType == item) {
      this.selectedNodeType = null;
      this.drawboadStatus.cancelSelectedNodeType();
    } else {
      this.selectedNodeType = item;
      this.drawboadStatus.setSelectedNodeType(item);
    }
  }

  itemDbClicked(item: {}) {

  }

  ngOnInit() {

    // console.log("toobox");
    // console.log(this.processesTypes);
  }

}
