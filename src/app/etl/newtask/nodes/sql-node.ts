import {node} from './node';

export class SqlPara{//定义关系数据库的参数
    db_addr: string;
    user_name: string;
    pswd: string;

    table_list: Array<string>;
    column_list: Array<Array<string>>;
    partition_column: string;
}

export class SqlNode extends node{//继承node,包含SqlPara参数
    db_type: string;
    parameter: SqlPara;
}

export class MySqlNode extends SqlNode{//继承SqlNode,定义db_type为"mysql"
    constructor(f_id: number, label: string, position: any){
        super(f_id, label, position);
        this.db_type = "mysql";
    }
}

export class OracleNode extends SqlNode{//继承SqlNode,定义db_type为"oracle"
    constructor(f_id: number, label: string, position: any){
        super(f_id, label, position);
        this.db_type = "oracle";
    }
}