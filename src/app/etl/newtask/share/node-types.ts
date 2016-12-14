import {DatabaseType} from "./json-types";
import {ParameterType} from "./json-types";

export class BasicDatabaseNodeType {
  id: string;                   //数据库存储ID
  label: string;                //名称
  description: string;          //数据库描述
  parameters: ParameterType[];  //数据库参数
  //以下这么做,是因为关系数据库的后三项参数时需要与用户交互获得,与前三项中间需要加一个交互按钮
  general_parameters: ParameterType[];//关系数据库的地址.用户名.密码三项参数; 非关系数据库的所有参数
  expand_parameters: ParameterType[];//关系数据库的表名.列名.partition column三项参数; 非关系数据库为空
  type: string;

  constructor(json: DatabaseType) {
    this.id = json.id;
    this.label = json.label;
    this.description = json.description;
    this.parameters = json.parameters;
  }
}

export class SqlDatabase extends BasicDatabaseNodeType{
    constructor(json: DatabaseType){
        super(json);
        this.type = "sql";
        this.general_parameters = this.parameters.slice(0, 3);
        this.expand_parameters = this.parameters.slice(3);
    }
}

export class NosqlDatabase extends BasicDatabaseNodeType{
    constructor(json: DatabaseType){
        super(json);
        this.type = "nosql";
        this.general_parameters = json.parameters;
        this.expand_parameters = null;
    }
}

export type DatabaseNodeType = SqlDatabase | NosqlDatabase;