/**
 * Created by zhaoli on 16-11-20.
 */
export class AlgorithmPara {
    constructor(

    ) { }
    public algorithmName: string;
    public jarName: string;
    public tags: string;
    public description: string;
    public inputSort: string;
    public inputNumber: number;
    public outputNumber: number;
    public className: string;
    parameters:Parameters[];
}
export type Parameters={
    //count:number;
    label:string;
    val:string;
    type:string;
    tags:string;
    description:string;

}

