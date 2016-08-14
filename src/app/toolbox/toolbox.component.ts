import {Component, OnInit} from '@angular/core';
import {DrawboardStatusService} from "../drawboard-status.service";
import {Node} from "../shared/node.class";

@Component({
  moduleId: module.id,
  selector: 'app-toolbox',
  templateUrl: 'toolbox.component.html',
  styleUrls: ['toolbox.component.css']
})
export class ToolboxComponent implements OnInit {

  selectedNode: {} = null;

  dataSources: [{}] = [
    {
      'type': 'data_source',
      'name': '鸢尾花数据集',
      'upload_date': '2016-2-3'
    }
  ];

  processes: [{}] = [
    {
      'type': 'process',
      'name': "朴素贝叶斯",
      'description': 'naive 的贝叶斯算法',
    },
    {
      'type': 'process',
      'name': "kNN聚类"
    },
    {
      'type': 'process',
      'name': "感知器分类"
    }
  ];

  constructor(private drawboadStatus: DrawboardStatusService) {
    let self = this;
    this.drawboadStatus.bookSelectedNode((node: {})=> {
      self.selectedNode = node;
    })
  }

  itemClicked(item: {}) {
    this.selectedNode = item;
    this.drawboadStatus.setSelectedNode(item);
  }

  ngOnInit() {
  }

}
