import {ParameterType, AlgorithmType, DatasetType} from "./json-types";
//todo：需不需要一个父类？
export class Algorithm {
  id: string;                   //数据库存储ID
  name: string;                 //名称
  type: string;                 //算法类型
  description: string;          //算法描述
  parameters: ParameterType[];  //算法参数

  constructor(json: AlgorithmType) {
    this.id = json.id;
    this.name = json.label;
    this.type = json.category;
    this.description = json.description;
    this.parameters = json.parameters;
  }
}

export class Dataset {
  id: string;
  name: string;
  description: string;
  parameters: ParameterType[];

  constructor(json: DatasetType) {
    this.id = json.id;
    this.name = json.label;
    this.description = json.description;
    this.parameters = json.parameters;
  }
}
export type WorkflowNodeType = Algorithm | Dataset;
