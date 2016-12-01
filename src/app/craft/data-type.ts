import {ParameterJSON} from "./drawboard.component/internal/drawboard.node-types";
export type DataSourceNodeTypeJSON2 = {
    id: string,
    label: string,
    description: string,
    flowID: string
    parameters: ParameterJSON[];
}
export type ProcessNodeTypeJSON2 = {
    id: string,
    label: string,
    description: string,
    flowID: string,
    parameters: ParameterJSON[];
}
export type SubmitJson = {
    taskName: string,
    sources: DataSourceNodeTypeJSON2[],
    processes: ProcessNodeTypeJSON2[],
    paths: string[]
}