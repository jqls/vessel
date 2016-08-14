import {Injectable} from '@angular/core';

@Injectable()
export class ProcessService {
  private data_sources: Array<{}> = [
    {
      'type': 'data_source',
      'name': '鸢尾花数据集',
      'upload_date': '2016-2-3'
    }
  ];
  private processes: Array<{}> = [
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
