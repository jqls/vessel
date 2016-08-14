import {Injectable} from '@angular/core';

@Injectable()
export class ProcessService {
  private data_sources: [{}];
  private processes: [{}];

  getDataSources(): {}[] {
    //todo: change to $http
    return []
  }

  getProcesses(): {}[] {
    //todo: change to $http
    return [
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
  }

  constructor() {
  }

}
