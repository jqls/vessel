import {Component, OnInit} from '@angular/core';
import * as io from 'socket.io-client';
import {NgForm} from "@angular/forms";
import {InputFormService} from './input-form.service';

@Component({
    selector: 'input-form',
    providers: [InputFormService],
    templateUrl: './input-form.component.html',
    styleUrls: [ './input-form.component.css' ]
})
export class InputFormComponent implements OnInit{
    tables_columns:any;
    table_list: Array<string> = [];//用来接收后台的table数据
    columnList_of_index: Array<any> = [];//用来绑定被选定的table的column列表
    column_list: Array<Array<string>> = [];//用来存储由后台发来的column数据
    select_table_flag: number[] = [];//用来标记某个table是否有column被选择, 目前未使用
    table_onList:string = '';//用来绑定table列表的下拉菜单
    selected_table_column: Array<any> = [];//用来记录table和column的最终选择结果  
    hdfs_dir:any;

    out_formats = ['Text File', 'Sequence File', 'Parquet File'];
    to_compress = ['No', 'Yes'];
    compression_type = ['NONE', 'DEFAULT', 'GZIP', 'BZIP2', 'LZO', 'LZ4', 'SNAPPY', 'CUSTOM'];
    // hdfs_addr = "";//hdfs中的文件目录
    out_dir = '';
    out_form = this.out_formats[0];
    is_comp = this.to_compress[0];
    comp_type = this.compression_type[0];
    
    rdb_addr = "";
    user_name = "";
    pswd = "";
    table_name = "";
    columns = "";
    submitted=false;

    // socket = null;
    private socketServerUrl = 'http://localhost:3008';
    socket_log:any = null;
    connection:any;

    log_content:Array<string> = [];

    // select_arr:Array<any> = [{value:'a', label:'b'}, {value:'c', label:'d'}];    

    //定义当前的费关系数据库tab页名称
    cur_nosql: string = 'hdfs';
    
    constructor(private inputformService:InputFormService){
        
        if(this.table_list.length > 0){
            var index_onList:number = -1;
            this.table_onList = this.table_list[0];//初始化默认为table_list[0]
            //通过table_onList的值获得当前在table下拉菜单中的索引
            index_onList = this.table_list.indexOf(this.table_onList);
            
            // alert(index_onList);
            
            //通过index_onList获得该table对应的列名数组
            if(index_onList > -1){
                var columns_of_index:string[] = this.column_list[index_onList];
                
                //alert(columns_of_index);//输出当前选定table的column_list
                
                for(var i=0; i<columns_of_index.length; i++){
                    this.columnList_of_index.push({label: columns_of_index[i], value: columns_of_index[i]});
                }
            }
            
        }
        //alert(this.select_table_flag);      
    }

    //table列表下拉菜单的监听方法
    select_table(){
        //获取当前点击的table对应的index
        var index_onList:number = this.table_list.lastIndexOf(this.table_onList);
        
        //alert(index_onList);
        
        //根据index获取该table对应的column列表
        var columns_of_index:string[] = this.column_list[index_onList];
        this.columnList_of_index = [];
        for(var i=0; i<columns_of_index.length; i++){
            this.columnList_of_index.push({label: columns_of_index[i], value: columns_of_index[i]});
        }
    }

    onMultipleSelected(item) {
        //alert("add"+item.value);
        this.update_selected(item, 0);
        alert(JSON.stringify(this.selected_table_column));
    }

    onMultipleDeselected(item) {
        // alert("delete"+item.label);
        this.update_selected(item, 1);
    }

    update_selected(item:any, operation:number){//operation用来定义操作类型,0代表增加,1代表删除
        var obj_found:boolean = false;
        var len:number = this.selected_table_column.length;
        for (var i=0; i<len; i++){
            var cur:any = this.selected_table_column[i];
            if( cur['table_name']==(this.table_onList)){//在selected列表里已经有该table,更新数据
                // alert("Founded!");
                obj_found = true;
                if(operation == 0){//增加column
                    cur['col_list'].push(item.value);                 
                }else{//删除column
                    var tmp = cur['col_list'].indexOf(item.value);
                    cur['col_list'].splice(tmp, 1);//将元素删除
                }
                break;
            }
        }
        if(!obj_found){//在selected列表里未找到该table
            var t = {'table_name':this.table_onList, 'col_list':[item.value]};
            this.selected_table_column.push(t);
        }
    }

    getTablesAndColumns():void{
        this.inputformService
            .getTablesAndColumns()
            .then(data => this.tables_columns = data);
    }

    // connect_rdb():void{
    //     this.inputformService
    //         .connect_rdb()
    //         .then(data => this.tables_columns = data);
        
    // }

    // connect_rdb_test(name:string):void{
    //     this.inputformService
    //         .connect_rdb_test(name)
    //         .then(data => this.tables_columns = data);
    // }

    connect_rdb_three(rdb_addr:string, name:string, pswd:string):void{
        this.inputformService
            .connect_rdb_three(rdb_addr, name, pswd)
            .then(data => { //返回数据类型为string,需要使用JSON.parse转换为js对象
                            this.tables_columns = data;
                            alert(data);
                            var tmp = JSON.parse(data);
                            var t_num = tmp.length;
                            //alert(t_num);
                            var t = this.table_list.length;
                            for(let i=0; i<t_num; i++){                                
                                this.table_list.push(tmp[i]['table_name']);
                                var tmp_col:string[] = tmp[i]['col_list'];
                                this.column_list.push(tmp_col);
                            }
                            this.update_table_column();
                        });
        //获得tables和columns后更新值,将其展示在网页上
        //alert(this.tables_columns);        
    }

    update_table_column():void{
        if(this.table_list.length > 0){
            var index_onList:number = -1;
            this.table_onList = this.table_list[0];//初始化默认为table_list[0]
            //通过table_onList的值获得当前在table下拉菜单中的索引
            index_onList = this.table_list.indexOf(this.table_onList);
            
            // alert(index_onList);
            
            //通过index_onList获得该table对应的列名数组
            if(index_onList > -1){
                var columns_of_index:string[] = this.column_list[index_onList];
                
                //alert(columns_of_index);//输出当前选定table的column_list
                
                for(var i=0; i<columns_of_index.length; i++){
                    this.columnList_of_index.push({label: columns_of_index[i], value: columns_of_index[i]});
                }
            }
        }
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
    get_hdfs_dir():void{
        this.inputformService
        .getHdfsDir()
        .then(data => {
                //alert(data);
                this.hdfs_dir = JSON.parse(data);              
                // alert("before"+JSON.stringify(this.hdfs_dir));
                this.recursion_set_close(this.hdfs_dir);
            });
    }

    ngOnInit():void{
        // this.getHeros();
        //this.getTablesAndColumns();
        this.get_hdfs_dir();

        var socket = io(this.socketServerUrl);
        
        socket.on('message', (data)=>{
            //alert(data);
            this.log_content.push(data);
            socket.emit('my other event', 'sent to server');
        });
    }

    //最后的提交按钮
    onSubmit():void { 
        this.submitted = true; 
        let result = JSON.stringify({"table_column":this.selected_table_column,"out_dir":this.out_dir, "out_format":this.out_form, "is_compress":this.is_comp, "compression_type":this.comp_type});
        alert(result); 
        this.inputformService
            .postResult(result)
            .then();
    }
}