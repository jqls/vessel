export type NodeType = {
  category: string,
  inputs: InputType[],
  name: string,
  outputs: OutputType[],
  params: ParametersType[],
  id: number
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

export type ConnectionType = {
  from: ProcessorType,
  to: ProcessorType
}
