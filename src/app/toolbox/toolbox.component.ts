import {Component, OnInit} from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'app-toolbox',
  templateUrl: 'toolbox.component.html',
  styleUrls: ['toolbox.component.css']
})
export class ToolboxComponent implements OnInit {

  dataSources: [{name: string, upload_date: string}] = [
    {
      'name': '鸢尾花数据集',
      'upload_date': '2016-2-3'
    }
  ];

  processes: [{name: string}] = [
    {
      'name': "朴素贝叶斯"
    },
    {
      'name': "kNN聚类"
    },
    {
      'name': "感知器分类"
    }
  ];

  constructor() {
  }

  ngOnInit() {
  }

}
