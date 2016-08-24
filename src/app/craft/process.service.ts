import {Injectable} from "@angular/core";
import {DataSourceNode} from "./drawboard.component/internal/drawboard.node";
import {
  DataSourceNodeType,
  ProcessNodeTypeJSON,
  ProcessNodeType,
  DataSourceNodeTypeJSON
} from "./drawboard.component/internal/drawboard.node-types";

@Injectable()
export class ProcessService {
  private HOST = "127.0.0.1";
  private PORT = "8090";
  private ALL_SOURCES = "/sources";
  private ALL_PROCESSES = "/processes";

  private dataSources: DataSourceNodeTypeJSON[] = [
    {
      "id": "1",
      "flowID": "2",
      "description": "鸢尾花数据集",
      "label": "鸢尾花数据集",
    }
  ];
  private processes: ProcessNodeTypeJSON[] = [
    {
      'id': '1',
      'label': "朴素贝叶斯",
      'description': 'naive 的贝叶斯算法',
      "algorithmParameters": [
        {
          "label": "特征数",
          "controlType": "text",
          "val": "5",
        },
        {
          "label": "学习率",
          "controlType": "float",
          "val": "1.0",
        },
        {
          "label": "模型类型",
          "controlType": "select",
          "val": "0",
          "options": [
            "multi-nominal",
            "bernoulli"
          ],
        }
      ],
    },
    {
      'id': '2',
      'label': "tf-idf",
      'description': '',
      "algorithmParameters": [
        {
          "label": "参数A",
          "controlType": "text",
          "val": "5",
        },
        {
          "label": "参数B",
          "controlType": "float",
          "val": "1.0",
        }
      ],
    }
  ];

  getDataSources(): DataSourceNodeType[] {
    //todo: change to $http
    return this.dataSources.map((dataSourceJSON): DataSourceNodeType=> {
      return new DataSourceNodeType(dataSourceJSON);
    });
  }

  getProcesses(): ProcessNodeTypeJSON[] {
    //todo: change to $http
    return this.processes.map((processJSON): ProcessNodeType=> {
      return new ProcessNodeType(processJSON);
    });
  }

  newDataSource(): DataSourceNode {
    return null;
  }

  constructor() {
  }

}
