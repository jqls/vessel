import {Component, OnInit} from '@angular/core';
import * as d3 from "d3";
import * as io from 'socket.io-client';
import {InputFormService} from "./input-form.service";
import {EtlToolboxComponent} from './toolbox/toolbox.component';
import {DataInteractionService } from './data-interaction.service';
import {DatabaseNode} from './drawboard/internal/node';
import {Relation} from './drawboard/internal/relation'

@Component({
  selector: 'app-newtask',
  templateUrl: './newtask.component.html',
  styleUrls: ['./newtask.component.sass']
})

export class NewTaskComponent implements OnInit {
  private task_name: string;
  private workflowNodes: DatabaseNode[];
  private relations: Relation[];
  private to_submit :boolean;//是否点击"提交运行"
  private result: Object;

  submitted = false;

  // socket = null;
  private socketServerUrl = 'http://localhost:3008';
  socket_log: any = null;
  log_content: Array<string> = [];

  constructor(private inputformService: InputFormService, 
      private data_interactionService: DataInteractionService) {
    this.task_name = null;
    this.to_submit = false;
    this.result = null;
    this.data_interactionService.bookTaskName((task_name: string)=>{
      this.task_name = task_name;
      this.to_submit = true;
      this.submit();
    });
    this.data_interactionService.bookWorflowNodes((workflowNodes: DatabaseNode[])=>{
      this.workflowNodes = workflowNodes;
    });
    this.data_interactionService.bookRelations((relations: Relation[])=>{
      this.relations = relations;
    });
  }

  ngOnInit(): void {
    var t: Object[] = [{
                        "table_name": "table_1", 
                        "col_list": ["col_1_1", "col_1_2"]
                      },
                      {
                        "table_name": "table_2", 
                        "col_list": ["col_2_1", "col_2_2", "col_2_3"]
                      }];

    var socket = io(this.socketServerUrl);

    socket.on('message', (data) => {
      //alert(data);
      this.log_content.push(data);
      socket.emit('my other event', 'sent to server');
    });
    // this.initSVG();
    // this.bindEventHandler();
  }

  setResult(): void{
    var sqlNode_index: number, nosqlNode_index: number;
    for(let i=0; i<this.workflowNodes.length; i++){
      if(this.workflowNodes[i].nodetype.type == "sql"){
        sqlNode_index = i;
      }else if(this.workflowNodes[i].nodetype.type == "nosql"){
        nosqlNode_index = i;
      }
    }
    var relation_json: Object[] = [];
    this.result = {
      task_name: this.task_name,
      from_node: this.workflowNodes[sqlNode_index].toJSON(),
      to_node: this.workflowNodes[nosqlNode_index].toJSON()
    }
  }

  //最后的提交按钮
  submit(): void {
    console.log("Submit Clicked!");
    console.log(this.workflowNodes.length);
    console.log(this.relations.length);
    for(let i=0; i<this.workflowNodes.length; i++){
      var tmp_node = this.workflowNodes[i];
      console.log("Node " + i + ": ");
      console.log("flow_id: " + tmp_node.flowID);
      console.log("label: " + tmp_node.label);
      console.log("para_length: " + tmp_node.nodetype.parameters.length);
      console.log("1st parameter's value: " + tmp_node.nodetype.parameters[0].val);
      console.log("node to JSON: " + JSON.stringify(tmp_node.toJSON()));
    }
    //不确定是否有用
    this.submitted = true;

    //构造结果的JSON文件
    this.setResult();
    console.log(JSON.stringify(this.result));

    // let result = JSON.stringify({
    //   "table_column": this.selected_table_column,
    //   "out_dir": this.out_dir,
    //   "out_format": this.out_form,
    //   "is_compress": this.is_comp,
    //   "compression_type": this.comp_type
    // });
    // alert(result);
    this.inputformService
      .postResult(this.result)
      .then(data=>{
        console.log("submit returned!");
        console.log(data);
        data = JSON.parse(data);
        if(data['state'] == 0){
          console.log("Task Failed!");
        }else if(data['state'] == 1){
          console.log("Task Success!");
        }
      });


  }
}
