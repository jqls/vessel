export type ParaJSON = {
  //算法上传时 POST的参数后把responce返回的参数解析成json格式获取ID
  algorithmID:string
};
export type Parameters={
  count:number;
  label:string;
  vals:string;
  types:string;
  tags:string;
  description:string;

}
export class BasePara {
}
