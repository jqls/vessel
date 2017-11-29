import { DatabaseNodeType, SqlDatabase, NosqlDatabase } from '../share/node-types';
import { ParameterType, DatabaseType } from "../share/json-types";

export class SqlParameters {
    sql_parameters: ParameterType[];
    constructor(){
        this.sql_parameters = [];
        this.sql_parameters.push(<ParameterType>{
            label: "数据库地址",
            val: "",
            required: true,
            controlType: "text"
        });
        this.sql_parameters.push(<ParameterType>{
            label: "用户名",
            val: "",
            required: true,
            controlType: "text"
        });
        this.sql_parameters.push(<ParameterType>{
            label: "密码",
            val: "",
            required: true,
            controlType: "text"
        });
        this.sql_parameters.push(<ParameterType>{
            label: "抽取对象",
            val: "",
            required: true,
            controlType: "multilayer-select",
            selectOptions: [],
            val_expand: [],
            multiSelectOptions: []
        });
        // this.sql_parameters.push(<ParameterType>{
        //     label: "数据库表",
        //     val: "",
        //     required: true,
        //     controlType: "select",
        //     selectOptions: []
        // });
        // this.sql_parameters.push(<ParameterType>{
        //     label: "列",
        //     val: "",
        //     required: true,
        //     controlType: "select",
        //     selectOptions: []
        // });
        // this.sql_parameters.push(<ParameterType>{
        //     label: "分区列",
        //     val: "",
        //     required: true,
        //     controlType: "select",
        //     selectOption: []
        // });
    }
}

export class NosqlParameters {
    nosql_parameters: ParameterType[];
    constructor(){
        this.nosql_parameters = [];
        this.nosql_parameters.push(<ParameterType>{
            label: "输出目录",
            val: "",
            required: true,
            controlType: "text"
        });
        this.nosql_parameters.push(<ParameterType>{
            label: "输出格式",
            val: "",
            required: true,
            controlType: "select",
            selectOptions: ['Text File', 'Sequence File', 'Parquet File']
        });
        this.nosql_parameters.push(<ParameterType>{
            label: "压缩类型",
            val: "",
            required: true,
            controlType: "select",
            selectOptions: ['NONE', 'DEFAULT', 'GZIP', 'BZIP2', 'LZO', 'LZ4', 'SNAPPY', 'CUSTOM']
        });
    }
}

export class ToolboxList{
    SqlList: SqlDatabase[];//ToolboxComponent中需要展示的关系数据库
    NosqlList: NosqlDatabase[];//ToolboxComponent中需要展示的非关系数据库

    private sql_list: Array<string> = ['MySql', 'Oracle'];//现有的关系数据库类型
    private nosql_list: Array<string> = ['Hdfs', 'Hive', 'Hbase'];//现有的费关系数据库看类型

    private sql_parameter: ParameterType[];


    constructor(){
        this.SqlList = [];
        this.NosqlList = [];
        for(let sql_db of this.sql_list){
            var tmp: DatabaseType = {
                id: null,//暂时不需要id
                label: sql_db,
                description: "",
                parameters: new SqlParameters().sql_parameters
            }
            this.SqlList.push(new SqlDatabase(tmp));
        }
        for(let nosql_db of this.nosql_list){
            var tmp: DatabaseType = {
                id: null,
                label: nosql_db,
                description: "",
                parameters: new NosqlParameters().nosql_parameters
            }
            this.NosqlList.push(new NosqlDatabase(tmp));
        }
    }
}