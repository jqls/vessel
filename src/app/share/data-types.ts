import {ParameterType, NodeType, InputType, OutputType, ParametersType} from "./json-types";
import {mydebug} from "./my-log";
export type WorkflowNodeType = Processor;

export class Processor {
  private debug_location: string = "Processor";
  category: string;
  inputs: InputType[];
  name: string;
  outputs: OutputType[];
  parameters: ParameterType[];
  reRender_param = [];
  id: number;
  visualization: boolean;
  ac_id: number;

  constructor(nodeType: NodeType) {
    this.category = nodeType.category;
    this.inputs = nodeType.inputs;
    this.name = nodeType.name;
    this.outputs = nodeType.outputs;
    this.id = nodeType.id;
    this.ac_id = nodeType.ac_id;
    this.parameters = [];
    this.visualization = nodeType.visualization;
    nodeType.params.forEach((param: ParametersType) => {
      let newPara = {};
      newPara['key'] = param.key;
      newPara['label'] = param.label;
      newPara['value'] = param.value;
      newPara['controlType'] = param.controlType;
      newPara['required'] = param.required;
      newPara['options'] = param.choices;
      newPara['filelist'] = param.filelist;
      newPara['database'] = param.database;
      newPara['stage'] = param.stage;
      newPara['description'] = param.description;
      newPara['order'] = 1;
      mydebug(this.debug_location, "constructor", JSON.stringify(newPara));
      mydebug(this.debug_location, "constructor", JSON.stringify(<ParameterType>newPara));
      this.parameters.push(<ParameterType>newPara);
    });
    console.log(this);
  }
}
