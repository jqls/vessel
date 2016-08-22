import {Injectable} from "@angular/core";
import {DataSourceJSON, ProcessJSON, DataSourceNode, ProcessNode} from "../shared/json-typedef";
import {Http} from "@angular/http";

@Injectable()
export class ProcessService {
  private HOST = "127.0.0.1";
  private PORT = "8090";
  private ALL_SOURCES = "/sources";
  private ALL_PROCESSES = "/processes";

  private dataSources: DataSourceJSON[] = [];
  private processes: ProcessJSON[] = [
    {
      'id': '1',
      'label': "朴素贝叶斯",
      'tags': ['分类'],
      'description': 'naive 的贝叶斯算法',
      "algorithm_parameters": [
        {
          "label": "特征数",
          "controlType": "text",
          "defaultVal": "5",
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
            "multi-nominal",
            "bernoulli"
          ],
        }
      ],
    },
    {
      'id': '2',
      'label': "tf-idf",
      'tags': ['分类'],
      'description': '',
      "algorithm_parameters": [
        {
          "label": "参数A",
          "controlType": "text",
          "defaultVal": "5",
        },
        {
          "label": "参数B",
          "controlType": "float",
          "defaultVal": "1.0",
        }
      ],
    }
  ];

  getDataSources(): DataSourceNode[] {
    //todo: change to $http
    this.http.get(`${this.HOST}:${this.PORT}${this.ALL_SOURCES}`);
    return this.dataSources.map((dataSource): DataSourceNode=> {
      return new DataSourceNode(dataSource);
    });
  }

  getProcesses(): ProcessNode[] {
    //todo: change to $http
    return this.processes.map((process): ProcessNode=> {
      return new ProcessNode(process);
    });
  }

  constructor(private http: Http) {
  }

}
