import { Component, OnInit} from '@angular/core';
import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';

import {InputFormService} from '../input-form.service';
import {InputFormComponent} from '../input-form.component';

@Component({
    selector: 'hive_component',
    providers: [InputFormService],
    templateUrl:'./hive.component.html'
}
)

export class HiveComponent implements OnInit{
    hdfs_dir:any;

    // out_formats = ['Text File', 'Sequence File', 'Parquet File'];
    // to_compress = ['No', 'Yes'];
    // compression_type = ['NONE', 'DEFAULT', 'GZIP', 'BZIP2', 'LZO', 'LZ4', 'SNAPPY', 'CUSTOM'];
    hdfs_addr = '';
    out_dir = '';
    // out_form = this.out_formats[0];
    // is_comp = this.to_compress[0];
    // comp_type = this.compression_type[0];

    constructor(private inputformService: InputFormService){}

    ngOnInit():void{
        // this.inputform.out_dir = this.out_dir;
        // this.inputform.out_form = this.out_form;
        // this.inputform.is_comp = this.is_comp;
        // this.inputform.comp_type = this.comp_type;
    }
    connect_noSql(hdfs_addr:string):void{
        this.inputformService
            .connect_noSql(hdfs_addr)
            .then(data => {
                //alert(data);
                this.hdfs_dir = JSON.parse(data);
                
                // alert("before"+JSON.stringify(this.hdfs_dir));
                this.recursion_set_close(this.hdfs_dir);
                // alert("after"+JSON.stringify(this.hdfs_dir));
            });
    }

    recursion_set_close(hdfs_dir:any):void{
        var len = hdfs_dir.length;
        for(var i=0; i<len; i++){
            //alert("level"+i.toString()+JSON.stringify(hdfs_dir[i]));
            var tmp = hdfs_dir[i];
            hdfs_dir[i]['closed'] = true;
            if(hdfs_dir[i]['content']){
                //alert("go deep");
                this.recursion_set_close(hdfs_dir[i]['content']);
            }
        }
    }
}