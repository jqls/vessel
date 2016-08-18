/**
 * Created by tang on 2016/8/18.
 */

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
  label: string,
  description: string,
  upload_date: string
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

  constructor(json: {id: string, label: string, description: string}) {
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
