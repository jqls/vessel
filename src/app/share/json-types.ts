//todo: 与朱博重新定义下json
export type AlgorithmType = {
  id: string,
  label: string,
  type?: string,
  description?: string,
  parameters: ParameterType[];
}

export type DatasetType = {
  id: string,
  label: string,
  description: string,
}

export type ParameterType = {
  label: string,
  controlType: string,
  val: string,
  slug?: string,
  required?: boolean,
  options?: string[],
  description?: string,
}

export type SparkDataType = {
  sources: DatasetType[],
  processes: AlgorithmType[]
}
