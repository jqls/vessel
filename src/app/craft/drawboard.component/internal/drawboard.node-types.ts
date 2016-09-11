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
  slug: string,
  label: string,
  description: string,
  parameters: ParameterJSON[];
}

export type DataSourceNodeTypeJSON = {
  id: string,
  label: string,
  slug: string,
  description: string,
  parameters: ParameterJSON[];
}


export class ProcessNodeType {
  id: string;
  label: string;
  slug: string;
  description: string;
  parameters: ParameterJSON[];

  constructor(json: ProcessNodeTypeJSON) {
    //todo: 将构造函数相同代码抽出
    this.id = json.id;
    this.label = json.label;
    this.slug = json.slug;
    this.description = json.description;
    this.parameters = json.parameters;
  }
}

export class DataSourceNodeType {
  id: string;
  label: string;
  slug: string;
  description: string;
  parameters: ParameterJSON[];

  constructor(json: DataSourceNodeTypeJSON) {
    this.id = json.id;
    this.label = json.label;
    this.slug = json.slug;
    this.description = json.description;
    this.parameters = json.parameters;
  }
}

export type WorkflowNodeType = ProcessNodeType|DataSourceNodeType;
