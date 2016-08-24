/**
 * Created by tang on 2016/8/24.
 */

export type ParameterJSON = {
  label: string,
  required?: boolean,
  controlType: string,
  options?: string[ ],
  description?: string,
  val: string,
}

export type ProcessNodeTypeJSON = {
  id: string,
  label: string,
  description: string,
  algorithmParameters: ParameterJSON[];
}

export type DataSourceNodeTypeJSON = {
  id: string,
  label: string,
  description: string
}


export class ProcessNodeType {
  id: string;
  label: string;
  description: string;
  algorithmParameters: ParameterJSON[];

  constructor(json: ProcessNodeTypeJSON) {
    //todo: 将构造函数相同代码抽出
    this.id = json.id;
    this.label = json.label;
    this.description = json.description;
    this.algorithmParameters = json.algorithmParameters;
  }
}

export class DataSourceNodeType {
  id: string;
  label: string;
  description: string;

  constructor(json: DataSourceNodeTypeJSON) {
    this.id = json.id;
    this.label = json.label;
    this.description = json.description;
  }
}

export type WorkflowNodeType = ProcessNodeType|DataSourceNodeType;
