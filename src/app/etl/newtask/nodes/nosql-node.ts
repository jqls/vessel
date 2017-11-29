import { node } from './node';

export class NosqlPara{
    db_addr: string;

    constructor(db_addr: string){
        this.db_addr = db_addr;
    }
}

export class HdfsPara extends NosqlPara{
    out_format_list: Array<string> = ['Text File', 'Sequence File', 'Parquet File'];;
    compression_type_list: Array<string> = ['NONE', 'DEFAULT', 'GZIP', 'BZIP2', 'LZO', 'LZ4', 'SNAPPY', 'CUSTOM'];

    out_format: string;
    compression_type: string;
    out_dir: string;
}

export class NosqlNode extends node{
    db_type: string;
    parameter: NosqlPara;
}

export class HdfsNode extends NosqlNode{
    constructor(f_id: number, label: string, position: any){
        super(f_id, label, position);
        this.db_type = "hdfs";
    }
}


