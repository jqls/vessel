export type ParameterType = {//定义参数的表示形式
  label: string,
  val: string,
  slug?: string,
  required?: boolean,
  options?: string[],
  description?: string,
  controlType: string,//用来记录用户的输入方式,可选"text"."select"."multi-select"."multilayer-select"
  selectOptions?: string[],//普通单列菜单的选项
  //下边两项为multilayer-select准备
  val_expand?: Object[],//多选菜单的选值
  multiSelectOptions?: Object[]//多菜单的选项
}

export type DatabaseType = {
  id: string,
  label: string,
  description?: string,
  parameters: ParameterType[];
}
