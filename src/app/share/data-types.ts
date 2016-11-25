import {ParameterType, AlgorithmType, DatasetType} from "./json-types";
export class Algorithm {
  id: string;                   //数据库存储ID
  name: string;                 //名称
  type: string;                 //算法类型
  description: string;          //算法描述
  parameters: ParameterType[];  //算法参数

  constructor(json: AlgorithmType) {
    //todo: 将构造函数相同代码抽出
    this.id = json.id;
    this.name = json.label;
    this.type = json.type;
    this.description = json.description;
    this.parameters = json.parameters;
  }
}

export class Dataset {
  id: string;
  name: string;
  description: string;

  constructor(json: DatasetType) {
    this.id = json.id;
    this.name = json.label;
    this.description = json.description;
  }
}
export type WorkflowUnit = Algorithm | Dataset;
