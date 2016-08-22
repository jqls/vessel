/**
 * Created by tang on 2016/8/18.
 */

export interface FlowElementParameter {
  //流程图参数
  key: string;
  label: string;
  val: string;
}

export interface FlowElement {
  //流程图元素
  id: string;
  flowID: string;
  label: string;

  parameters?: FlowElementParameter[];
  description?: string;
}

export class FlowRelation {
  //流程图关系
  fromID: string;
  fromPort: string;
  toID: string;
  toPort: string;
}

export class Workflow {
  //流程图
  sources: FlowElement[] = [];
  processes: FlowElement[] = [];
  relation: FlowRelation[] = [];
}

export type ParameterJSON = {
  label: string,
  required?: boolean,
  controlType: string,
  options?: string[],
  description?: string,
  defaultVal: any,
}

export type DataSourceJSON = {
  id: string,
  //todo: 添加流内ID号
  // flowID: string,
  label: string,
  description?: string,
  upload_date?: string
}

export type ProcessJSON = {
  id: string,
  label: string,
  tags: string[],
  description: string
  algorithm_parameters: ParameterJSON[];
}

export class NodeInfo {
  id: string;
  label: string;
  description: string;

  constructor(json: {id: string, label: string, description: string}|{}) {
    this.id = json['id'];
    this.label = json['label'];
    this.description = json['description'] || "";
  }

  getLabel(): string {
    return this.label || "";
  }

  getID(): string {
    return this.id || "";
  }

  getDescription(): string {
    return this.description || "";
  }
}

export class ProcessNode extends NodeInfo {
  tags: string[];
  algorithm_parameters: ParameterJSON[];

  constructor(processJSON: ProcessJSON) {
    super(processJSON);
    this.algorithm_parameters = processJSON.algorithm_parameters;
    this.tags = processJSON.tags || [];
  }
}

export class DataSourceNode extends NodeInfo {
  upload_date: string;

  constructor(dataSourceJSON: DataSourceJSON) {
    super(dataSourceJSON);
    this.upload_date = dataSourceJSON.upload_date;
  }
}
