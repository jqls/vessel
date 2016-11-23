import { Component, OnInit } from '@angular/core';
import {
    WorkflowNodeType, ProcessNodeType,
    DataSourceNodeType, StormGlobal, StormNodeTypeJSON, StormNodeType
} from "../../drawboard.component/internal/drawboard.node-types";
import {ProcessService} from "../../process.service";
import {DrawboardStatusService} from "../../drawboard-status.service";

@Component({
  selector: 'app-toolbox-storm',
  templateUrl: './toolbox-storm.component.html',
  styleUrls: ['./toolbox-storm.component.css']
})
export class ToolboxStormComponent implements OnInit {

  private nodes:StormNodeTypeJSON[] = [
  {
    "id":"path_to_Spout",
    "type":"Spout",
    "label":"WordReader",
    "parameters": [
      {
        "label": "Parallelism Hint",
        "controlType": "int",
        "val": "2"
      },
      {
        "label": "Tasks Number",
        "controlType": "int",
        "val": "4"
      }
    ]
  },
  {
    "id":"path_to_Bolt_0",
    "type":"Bolt",
    "label":"WordNomalizer",
    "parameters": [
      {
        "label": "Parallelism Hint",
        "controlType": "int",
        "val": "2"
      },
      {
        "label": "Tasks Number",
        "controlType": "int",
        "val": "4"
      }
    ]
  },
  {
    "id":"path_to_Bolt_1",
    "type":"Bolt",
    "label":"WordCounter",
    "parameters": [
      {
        "label": "Parallelism Hint",
        "controlType": "int",
        "val": "2"
      },
      {
        "label": "Tasks Number",
        "controlType": "int",
        "val": "4"
      }
    ]
  }
];
  selectedNodeType: WorkflowNodeType = null;
  stormNodesTypes: StormNodeType[];
  global: StormGlobal;
  constructor(private drawboadStatus: DrawboardStatusService,
              private processService: ProcessService) {
    this.global = {
      workersNumber : 1,
      asckerNumber : 1,
      maxTaskParalleism : 1
    };
    let self = this;
    this.drawboadStatus.bookSelectedNodeType((node: WorkflowNodeType)=> {
      self.selectedNodeType = node;
    });
    self.stormNodesTypes = this.nodes.map((nodeJson)=> new StormNodeType(nodeJson));
    // this.processService.getDataSources(processService.SPARKTYPE).then(dataSourceTypes => {
    //   this.dataSourceTypes = dataSourceTypes;
      // console.log(4);
      // console.log(dataSourceTypes);
    // });
    // console.log(1);
    // this.processService.getProcesses(processService.SPARKTYPE).then(processesTypes => {
    //   this.processesTypes = processesTypes;
      // console.log(3);
      // console.log(processesTypes);
      // console.log(this.processesTypes);
    // });
  }

  itemClicked(item: WorkflowNodeType) {
    console.log("in itemClick");
    console.log(item instanceof StormNodeType);
    console.log(this.stormNodesTypes[0] instanceof StormNodeType);
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
