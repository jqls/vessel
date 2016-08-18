import {Injectable} from "@angular/core";

@Injectable()
export class ProcessService {
  private data_sources: Array<{}> = [
    {
      'id': 1,
      'type': 'data_source',
      'name': '鸢尾花数据集',
      'upload_date': '2016-2-3'
    }
  ];
  private processes: Array<{}> = [
    {
      'id': 1,
      'type': 'process',
      'name': "朴素贝叶斯",
      'tags': [
        '分类',
      ],
      "algorithm_parameters": [
        {
          "name": "特征数",
          "type": "int",
          "default": 500000,
          "description": ""
        },
        {
          "name": "学习率",
          "type": "float",
          "default": 1.0,
          "description": ""
        },
        {
          "name": "模型类型",
          "type": "select",
          "default": 0,
          "options": [
            "multinomial",
            "bernoulli"
          ],
          "description": ""
        }
      ],
      'description': 'naive 的贝叶斯算法',
    }
  ];

  getDataSources(): Array<{}> {
    //todo: change to $http
    return this.data_sources;
  }

  getProcesses(): Array<{}> {
    //todo: change to $http
    return this.processes;
  }

  constructor() {
  }

}
