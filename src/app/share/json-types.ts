//todo: 与朱博重新定义下json
export type AlgorithmType = {
  flowID?: string,
  id: string,
  label: string,
  type?: string,//算法类型
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
  key: string
  label: string,
  val?: string,
  controlType: string,
  required?: boolean,
  order?: number,
  type?: string,
  options?: string[],
  description?: string,
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
