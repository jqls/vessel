import {Injectable} from "@angular/core";
import {DataSourceJSON, ProcessJSON} from "./shared/json-typedef";

@Injectable()
export class ProcessService {
  private data_sources: Array<DataSourceJSON> = [
    {
      'id': "1",
      'description': "鸢尾花数据集",
      'label': '鸢尾花数据集',
      'upload_date': '2016-06-20'
    }
  ];
  private processes: Array<ProcessJSON> = [
    {
      'id': '1',
      'label': "朴素贝叶斯",
      'tags': ['分类'],
      'description': 'naive 的贝叶斯算法',
      "algorithm_parameters": [
        {
          "label": "特征数",
          "controlType": "int",
          "defaultVal": "500000",
        },
        {
          "label": "学习率",
          "controlType": "float",
          "defaultVal": "1.0",
        },
        {
          "label": "模型类型",
          "controlType": "select",
          "defaultVal": "0",
          "options": [
            "multinomial",
            "bernoulli"
          ],
        }
      ],
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
