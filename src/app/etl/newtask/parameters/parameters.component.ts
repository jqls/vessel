import {Component, OnInit} from '@angular/core';
import {FormGroup} from "@angular/forms";

import {DataInteractionService} from "../data-interaction.service";
import {DatabaseNode} from "../drawboard/internal/node";
import {Relation} from "../drawboard/internal/relation";
// import {QuestionControlService} from "../../share/dynamic-form/question-control.service";
// import {QuestionBase} from "../../share/dynamic-form/questions";
import {ParameterType} from "../share/json-types";
import {ParameterService} from './parameters.service';

@Component({
  selector: 'etl-parameters',
  templateUrl: './parameters.component.html',
  styleUrls: ['./parameters.component.sass']
})

export class EtlParametersComponent{
  //to remove
  tables_columns: any;
  table_list: string[] = [];//用来接收后台的table数据
  columnList_of_index: Array<any> = [];//用来绑定被选定的table的column列表
  column_list: Array<Array<string>> = [];//用来存储由后台发来的column数据
  select_table_flag: number[] = [];//用来标记某个table是否有column被选择, 目前未使用
  table_onList: string = '';//用来绑定table列表的下拉菜单
  selected_table_column: Array<any> = [];//用来记录table和column的最终选择结果

  // private debug_location: string = "ParametersComponent";
  private selectedNode: DatabaseNode;
  private selectedRelation: Relation;
  private general_parameters: ParameterType[];
  private expand_parameters: ParameterType[];
  private isSql: boolean = false;//是否为关系数据库
  private isNosql: boolean = false;
  //暂时解决不了tab分页问题,临时方法
  private tab: string = 'para';
  private log: string = 'Execution log.';
  //是否已经连接数据库.已连接则在下拉菜单中显示内容,否则显示"未连接数据库"
  private rdb_connected: boolean = false;

  // questions: QuestionBase<any>[];
  // form: FormGroup;

  constructor(private service: DataInteractionService, private parameterService: ParameterService) {
    //订阅selectedNode和selectedRelation
    this.service.bookSelectedNode((node: DatabaseNode) => {
      this.selectedNode = node;
      // this.parameters = node instanceof AlgorithmNode ?
      //   (<AlgorithmNode>this.selectedNode).nodetype.parameters:
      //   [];
      this.isSql = node ? node.nodetype.type=="sql" : null;
      this.isNosql = node ? node.nodetype.type=="nosql" : null;
      this.general_parameters = node ? node.nodetype.general_parameters : null;//存在问题 ?  为何不能直接使用node,若直接使用则报错node is null     
      this.expand_parameters = node ? node.nodetype.expand_parameters : null;
      // this.questions = this.qcs.toQuestions(this.parameters);
      // this.form = this.qcs.toFormGroup(this.questions);
      console.log(this.selectedNode?this.selectedNode.nodetype.type+"fgjaosjngoashgnoahgoahngohanohno":"node is null");
    });

    this.service.bookSelectedRelation((relation: Relation) => {
      this.selectedRelation = relation;
    });
  }

  //old version
  //TO Remove!!!!!!!!!
  // //table列表下拉菜单的监听方法
  // select_table() {
  //   //获取当前点击的table对应的index
  //   var index_onList: number = this.table_list.lastIndexOf(this.selectedNode.nodetype.expand_parameters[0].val);

  //   //alert(index_onList);

  //   //根据index获取该table对应的column列表
  //   var columns_of_index: string[] = this.column_list[index_onList];
  //   this.columnList_of_index = [];
  //   for (var i = 0; i < columns_of_index.length; i++) {
  //     this.columnList_of_index.push({label: columns_of_index[i], value: columns_of_index[i]});
  //   }
  //   this.selectedNode.nodetype.expand_parameters[1].selectOptions = columns_of_index;
  //   this.selectedNode.nodetype.expand_parameters[2].selectOptions = columns_of_index;
  // }

  // onMultipleSelected(item) {
  //   //alert("add"+item.value);
  //   this.update_selected(item, 0);
  //   alert(JSON.stringify(this.selected_table_column));
  // }

  // onMultipleDeselected(item) {
  //   // alert("delete"+item.label);
  //   this.update_selected(item, 1);
  // }

  // update_selected(item: any, operation: number) {//operation用来定义操作类型,0代表增加,1代表删除
  //   var obj_found: boolean = false;
  //   var len: number = this.selected_table_column.length;
  //   for (var i = 0; i < len; i++) {
  //     var cur: any = this.selected_table_column[i];
  //     if (cur['table_name'] == (this.table_onList)) {//在selected列表里已经有该table,更新数据
  //       // alert("Founded!");
  //       obj_found = true;
  //       if (operation == 0) {//增加column
  //         cur['col_list'].push(item.value);
  //       } else {//删除column
  //         var tmp = cur['col_list'].indexOf(item.value);
  //         cur['col_list'].splice(tmp, 1);//将元素删除
  //       }
  //       break;
  //     }
  //   }
  //   if (!obj_found) {//在selected列表里未找到该table
  //     var t = {'table_name': this.table_onList, 'col_list': [item.value]};
  //     this.selected_table_column.push(t);
  //   }
  // }

  get_hdfs_dir(): void{
    this.parameterService.getHdfsDir()
                          .then(res => {
                            console.log("next is hdfs_dir:");
                            console.log(JSON.stringify(res));
                          });
  }

  connect_rdb(form: any): void {
    // console.log("***********************submit form***********");
    // // console.log(form);
    // console.log(JSON.stringify(form));
    this.parameterService
      .connect_rdb(form)
      .then(data => { //返回数据类型为Object类型
        // this.tables_columns = data;
        console.log("next is response--tables & columns");
        console.log(JSON.stringify(data));
        // alert(JSON.stringify(data));

        //new version
        let d = data;
        let d_length = d.length;
        //存储之前先将原有数据清空
        this.expand_parameters[0].multiSelectOptions = [];
        this.expand_parameters[0].val_expand = [];
        if (d_length>0){//返回数据不为空
          for(let i=0; i<d_length; i++){
            this.expand_parameters[0].multiSelectOptions.push(d[i]);
            this.expand_parameters[0].val_expand.push({'table_name':d[i]['table_name'], 'col_list':[]});
          }
          // console.log(this.selectedNode.nodetype.expand_parameters[0].multiSelectOptions[4]['col_list']);
          // console.log(this.selectedNode.nodetype.expand_parameters[0].val_expand[0]);
        }
        
      });
    //获得tables和columns后更新值,将其展示在网页上
    this.rdb_connected = true;
  }

  update_table_column(): void {
    if (this.table_list.length > 0) {
      var index_onList: number = -1;
      this.table_onList = this.table_list[0];//初始化默认为table_list[0]
      //通过table_onList的值获得当前在table下拉菜单中的索引
      index_onList = this.table_list.indexOf(this.table_onList);

      // alert(index_onList);

      //通过index_onList获得该table对应的列名数组
      if (index_onList > -1) {
        var columns_of_index: string[] = this.column_list[index_onList];
        // this.selectedNode.nodetype.expand_parameters[1].selectOptions = columns_of_index;
        // this.selectedNode.nodetype.expand_parameters[2].selectOptions = columns_of_index;

        //alert(columns_of_index);//输出当前选定table的column_list

        for (var i = 0; i < columns_of_index.length; i++) {
          this.columnList_of_index.push({label: columns_of_index[i], value: columns_of_index[i]});
        }
      }
    }
  }

  exist_in_array(arr: any[], target: any): boolean{
    let len = arr.length;
    if(len == 0){
      return false;
    }
    for(let i=0; i<len; i++){
      if(arr[i] == target){
        return true;
      }
    }
    return false;
  }

  table_column_is_selected(): boolean{
    let tmp = this.expand_parameters[0].val_expand;
    // console.log("this is the length of val_expand"+tmp.length);
    for(let i=0; i<tmp.length; i++){
      // console.log("####################"+tmp[i]['col_list']);
      if (tmp[i]['col_list'].length != 0){//不为空,表明已经做了修改
        return true;
      }
    }
    return false;
  }

  col_select($event: any, para:ParameterType, table_name: string, col:string):void{
    let cur_val = para.val_expand;
    console.log(cur_val);
    console.log(cur_val[4]);
    let len = para.val_expand.length;
    for(let i=0; i<len; i++){
      if(table_name!=cur_val[i]['table_name']){//寻找table_name所在的位置
        continue;
      }else{//找到位置
        if(this.exist_in_array(cur_val[i]['col_list'], col)){//如果已经存在,则删除
          cur_val[i]['col_list'] = cur_val[i]['col_list'].filter(function(a){
            return a != this;
          }, col);
        }else{//如果不在col_list中,添加;
          cur_val[i]['col_list'].push(col);
        }
      }
    }

    //判断是否选择了选项,选择则将按钮修改为"已选择";否则改为原有的提示
    console.log(this.table_column_is_selected());
    if(this.table_column_is_selected()){
      document.getElementById("table-select").innerText = "已选择";
    }else{
      document.getElementById("table-select").innerText = "选择数据库表和列";
    }

    //每次点击都使用setSelectedNode进行全局更新
    // console.log(this.selectedNode.nodetype.parameters[3].val_expand[4]['col_list']);
    this.service.setSelectedNode(this.selectedNode);
  }

  nosql_confirm():void{//观察者模式,更新所有component中的selectednode
    this.service.setSelectedNode(this.selectedNode);
    // for(let i=0; i<3; i++){
    //   console.log(this.selectedNode.nodetype.general_parameters[i].val);
    // }
  }

  ngOnInit() {
    if(this.selectedNode){
      console.log("sgfjogjoa");
      console.log(this.selectedNode.nodetype.type);
    }
    this.get_hdfs_dir();
    // console.log('next is a test!***************************');
    // let a = ['a', 'b', 'c'];
    // let ss = 'a';
    // a = a.filter( function(x){
    //   return x!= this;
    // }, ss);
    // console.log(a);
    var a = {"t1":["1","2","3"], "t2":["4","5"]};
    console.log()
  }
}
