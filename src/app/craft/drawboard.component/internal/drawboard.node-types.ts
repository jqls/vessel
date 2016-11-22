export type StormGlobal = {
  workersNumber: number,
  asckerNumber: number,
  maxTaskParalleism: number
}

export type StormNodeTypeJSON = {
  type: string,
  label: string,
  id: string,
  parameters: StormParameterJSON[]
}

export type StormParameterJSON = {
  label: string,
  controlType: string,
  required?: boolean,
  options?: string[],
  val: string
}
export type ProcessNodeTypeJSON = {
  id: string,
  label: string,
  description: string,
  parameters: ParameterJSON[];
}

export type DataSourceNodeTypeJSON = {
  id: string,
  label: string,
  description: string,
  // parameters: ParameterJSON[];
}


export type ParameterJSON = {
  label: string,
  slug: string,
  required?: boolean,
  controlType: string,
  options?: string[],
  description?: string,
  val: string
}
export class ProcessNodeType {
  id: string;
  label: string;
  description: string;
  parameters: ParameterJSON[];

  constructor(json: ProcessNodeTypeJSON) {
    //todo: 将构造函数相同代码抽出
    this.id = json.id;
    this.label = json.label;
    this.description = json.description;
    this.parameters = json.parameters;
  }
}

export class DataSourceNodeType {
  id: string;
  label: string;
  description: string;
  // parameters: ParameterJSON[];

  constructor(json: DataSourceNodeTypeJSON) {
    this.id = json.id;
    this.label = json.label;
    this.description = json.description;
    // this.parameters = json.parameters;
  }
}
export class StormNodeType {
  id: string;
  label: string;
  type: string;
  description: string;
  parameters: StormParameterJSON[];

  constructor(json: StormNodeTypeJSON) {
    this.id = json.id;
    this.label = json.label;
    this.type = json.type;
    this.parameters = json.parameters;
    // this.description = "";
  }
}
export type WorkflowNodeType = ProcessNodeType|DataSourceNodeType|StormNodeType;
