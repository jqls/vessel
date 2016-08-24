/**
 * Created by tang on 2016/8/18.
 */


// export type ParameterJSON = {
//   label: string,
//   required?: boolean,
//   controlType: string,
//   options?: string[ ],
//   description?: string,
//   val: string,
// }
//
// export type DataSourceJSON = {
//   id: string,
//   label: string,
//   description?: string,
//   uploadDate?: string
// }
//
// export type ProcessJSON = {
//   id: string,
//   label: string,
//   tags: string[],
//   description: string
//   algorithm_parameters: ParameterJSON[];
// }
//
// export class BasicNode {
//   id: string;
//   label: string;
//   description: string;
//
//   constructor(json: {}) {
//     this.id = json['id'];
//     this.label = json['label'];
//     this.description = json['description'] || "";
//   }
// }
//
// export interface getNewNodeInfo<T> {
//   newNodeInfo(flowID: number): T ;
// }
//
// export class ProcessNodeType extends BasicNode implements getNewNodeInfo<ProcessNode> {
//   newNodeInfo(flowID: number): ProcessNode {
//     let nodeInfo = ProcessNode();
//     nodeInfo.id = this.id;
//     nodeInfo.label = this.label;
//     nodeInfo.description = this.description;
//     nodeInfo.flowID = "" + flowID;
//     nodeInfo.algorithmParameters = this.algorithmParameters;
//     nodeInfo.tags = this.tags;
//     return nodeInfo;
//   }
//
//   private initJSON: ProcessJSON;
//   tags: string[];
//   algorithmParameters: ParameterJSON[];
//
//   constructor(processJSON: ProcessJSON) {
//     super(processJSON);
//     this.initJSON = processJSON;
//     this.algorithmParameters = processJSON.algorithm_parameters;
//     this.tags = processJSON.tags || [];
//   }
// }
//
//
// export class DataSourceNodeType extends BasicNode implements getNewNodeInfo<DataSourceNodeInfo> {
//   newNodeInfo(flowID: number): DataSourceNodeInfo {
//     var nodeInfo = new DataSourceNodeInfo();
//     nodeInfo.id = this.id;
//     nodeInfo.label = this.label;
//     nodeInfo.description = this.description;
//     nodeInfo.flowID = "" + flowID;
//     nodeInfo.uploadDate = this.uploadDate;
//     return nodeInfo;
//   }
//
//   uploadDate: string;
//
//   constructor(dataSourceJSON: DataSourceJSON) {
//     super(dataSourceJSON);
//     this.uploadDate = dataSourceJSON.uploadDate | "2016-1-1";
//   }
// }
//
//
// export interface GetJSON {
//   getJSON(): string;
// }
//
// export class DataSourceNodeInfo implements GetJSON {
//   id: string;
//   label: string;
//   flowID: string;
//   description: string;
//   uploadDate: string;
//
//
//   getJSON(): string {
//     return JSON.stringify(this);
//   }
// }
//
// export class ProcessNode implements GetJSON {
//   id: string;
//   label: string;
//   flowID: string;
//   description: string;
//   tags: string[];
//   algorithmParameters: ParameterJSON[];
//
//
//   getJSON(): string {
//     return "";
//   }
// }
