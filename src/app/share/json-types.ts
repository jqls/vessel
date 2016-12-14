//-------------------旧版-------------------------
export type AlgorithmType = {
  flowID?: string,
  id: string,
  label: string,
  category?: string,//算法类型
  description?: string,
  parameters: ParameterType[];
}

export type DatasetType = {
  flowID?: string,
  id: string,
  label: string,
  description: string,
  parameters?: ParameterType[];
}

export type ParameterType = {
  key: string,
  label: string,
  value?: string,
  controlType: string,
  required?: boolean,
  order?: number,
  type?: string,
  options?: string[],
  description?: string,//hint
}

export type SparkDataType = {
  sources: DatasetType[],
  processes: AlgorithmType[]
}

export type SubmitJson = {
  taskName: string,
  sources: DatasetType[],
  processes: AlgorithmType[],
  paths: string[]
}
//-------------------新版-------------------------
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
  flow_id:number,
  parameters: {},

}

export type ConnectionType = {
  from: ProcessorType,
  to: ProcessorType
}
