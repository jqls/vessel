import {BasePara, Parameters} from "./base-para";
export class AlgorithmPara extends BasePara{
  public algorithmName: string;
  public jarName: string;
  public tags: string;
  public description: string;
  public inputSort: string;
  public inputNumber: number;
  public outputNumber: number;
  public className: string;
  parameters:Parameters[];

  constructor() {
    super();
  }

}
