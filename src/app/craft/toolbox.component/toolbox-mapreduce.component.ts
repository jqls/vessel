import { Component, OnInit } from '@angular/core';
import {WorkflowNodeType, ProcessNodeType, ProcessNodeTypeJSON} from "../drawboard.component/internal/drawboard.node-types";
import {DrawboardStatusService} from "../drawboard-status.service";

@Component({
  moduleId: module.id,
  selector: 'app-toolbox-mapreduce',
  templateUrl: 'toolbox-mapreduce.component.html',
  styleUrls: ['toolbox-mapreduce.component.css']
})
export class ToolboxMapreduceComponent implements OnInit {
  selectedNodeType: WorkflowNodeType = null;
  processesTypes: ProcessNodeType[];
  private processes: ProcessNodeTypeJSON[] = [
    {
      'id': '1',
      'label': "朴素贝叶斯",
      'description': 'naive 的贝叶斯算法',
      "parameters": [
        {
          "label": "特征数",
          'slug': "特征数",
          "controlType": "text",
          "val": "5",
        },
        {
          "label": "学习率",
          'slug': "学习率",
          "controlType": "float",
          "val": "1.0",
        },
        {
          "label": "模型类型",
          'slug': "模型类型",
          "controlType": "select",
          "val": "0",
          "options": [
            "multi-nominal",
            "bernoulli"
          ],
        }
      ],
    }
  ];
  constructor(private drawboadStatus: DrawboardStatusService) {
    console.log("mapreduce");
    let self = this;
    this.drawboadStatus.bookSelectedNodeType((node: WorkflowNodeType)=> {
      self.selectedNodeType = node;
    });
    self.processesTypes = this.processes.map((processJSON): ProcessNodeType=> {
      console.log(processJSON);
      return new ProcessNodeType(processJSON);
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

  }
}
