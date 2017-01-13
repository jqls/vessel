/**
 * Created by zhaoli on 16-11-20.
 */
export class AlgorithmPara {
    constructor(

    ) { }
    public name: string;
    public category: string;
    //public is_visualization: string;
    //parameters:Parameters[];
    //inputs:InputParameters[];
    //outputs:OutputParameters[];
}
export type Parameters={
    label:string;
    parameterType:string;
    choices?:string[];
    description: string;
}
export type InputParameters={
    name:string;
    dataType:string;
}
export type OutputParameters={
    name:string;
    dataType:string;
}

export type treeNode={
    id:number;
    name:string;
    isHidden:boolean;
    children:treeNode[];
}
export type childrenNode={
    id:number;
    name:string;
    isHidden:boolean;
}
