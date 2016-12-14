import {ParameterType, AlgorithmType, DatasetType, NodeType, InputType, OutputType, ParametersType} from "./json-types";
import {mydebug} from "./my-log";
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
export type WorkflowNodeType = Processor//Algorithm | Dataset;

export class Processor {
  private debug_location: string = "Processor";
  category: string;
  inputs: InputType[];
  name: string;
  outputs: OutputType[];
  parameters: ParameterType[];
  id: number;

  constructor(nodeType: NodeType) {
    this.category = nodeType.category;
    this.inputs = nodeType.inputs;
    this.name = nodeType.name;
    this.outputs = nodeType.outputs;
    this.id = nodeType.id;
    this.parameters = [];
    nodeType.params.forEach((param: ParametersType) => {
      let newPara = {};
      newPara['key'] = param.key;
      newPara['label'] = param.label;
      newPara['value'] = param.value;
      newPara['controlType'] = param.controlType;
      newPara['required'] = param.required;
      newPara['options'] = param.choices
      newPara['description'] = param.description;
      newPara['order'] = 1;
      mydebug(this.debug_location,"constructor", JSON.stringify(newPara));
      mydebug(this.debug_location,"constructor", JSON.stringify(<ParameterType>newPara));
      this.parameters.push(<ParameterType>newPara);
    })
    console.log(this);
  }
}
