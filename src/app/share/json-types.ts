export type NodeType = {
  category: string,
  inputs: InputType[],
  name: string,
  outputs: OutputType[],
  params: ParametersType[],
  id: number,
  visualization: boolean
}
export type OutputType = {
  processor_id: number,
  id: number
}
export type InputType = {
  processor_id: number,
  id: number
}
//参数的实际需求
export type ParameterType = {
  key: string,
  label: string,
  value?: string,
  controlType: string,
  required?: boolean,
  order?: number,
  type?: string,
  options?: string[],
  description?: string
}
//参数的完整格式
export type ParametersType = {
  parameterType: string,
  controlType: string,
  description: string,
  hint: string,
  required: boolean,
  optional: boolean,
  id: number,
  key: string,
  value: string,
  label: string,
  choices?: string[]
}

export type SubmitType = {
  name: string,
  processors: ProcessorType[],
  connections: ConnectionType[]
}

export type ProcessorType ={
  id: number,
  flow_id: number,
  parameters: {},
  loc_x?: number,
  loc_y?: number
}
export type FromToType={
  processor_id:number,
  id: number,
  flow_id: number
}

export type ConnectionType = {
  from: FromToType,
  to: FromToType
}
//用于显示workflow历史清单的简略信息
export type Workflow_history={
  id: number,
  name: string,
  submitTime: string
}
//用于获取全部workflow信息
export type Workflow_data_all={
  processors: reRender_Nodes[],
  connections: reRender_Connections[],
  parameters: reRender_Parameter[],
  id: number,
  name: string,
  submitTime: string
}

export type reRender_Parameter={
  processor_id: number,
  label: string,
  val: string,
  flow_id: number
}

export type reRender_Connections={

  output_processor_flow_id: string,
  input: InputType,
  input_processor_flow_id: string,
  id: number,
  output: OutputType

}
export type reRender_Nodes={
  inputs: number[],
  outputs: number[],
  flow_id: number,
  loc_x: number,
  loc_y: number,
  id: number
}
