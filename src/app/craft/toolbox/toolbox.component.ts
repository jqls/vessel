import {Component, OnInit, ViewChild} from '@angular/core';
import {DataService} from "../../data.service";
import {WorkflowNodeType, Processor} from "../../share/data-types";
import {CraftService} from "../craft.service";
import {mydebug} from "../../share/my-log";
import * as d3 from "d3"
@Component({
  selector: 'app-toolbox',
  templateUrl: './toolbox.component.html',
  styleUrls: ['./toolbox.component.sass']
})

export class ToolboxComponent implements OnInit {
  private debug_location: string = "ToolboxComponent";
  private selectedNodeType: WorkflowNodeType;
  private tree = [];
  private processors: Processor[];

  constructor(private dataService: DataService,
              private craftService: CraftService) {
    //通过订阅者模式保证本地与CraftService中的selectedNodeType的一致
    this.craftService.bookSelectedNodeType((nodeType: WorkflowNodeType) => {
      this.selectedNodeType = nodeType;
      mydebug(this.debug_location, "craftService.bookSelectedNodeType", String(this.selectedNodeType == null));
    });
    this.dataService.getNodeInfo().then(processors => {
      this.processors = processors;
      this.processors.forEach((item) => {
        let string = item.category;
        let ids = item.category_id;
        let str = string.split('>');
        let id  = ids.split('>');
        let last = str[str.length-1];
        let needrefactor = [];
        for (let i = 0; i < str.length; i++) {
          needrefactor.push({name: str[i], id: id[i]});
        }
        // console.log(str);

        // object版，留念
        // let temp1 = this.tree1;
        // str.forEach(s => {
        //   temp1[s] = temp1[s] ? temp1[s] : {};
        //   temp1 = temp1[s];
        //   if(s===last){
        //     temp1['val'] = item;
        //   }
        // });
        // console.log(this.tree1);
        /*
          构造目录树，利用数组形式
         */
        // console.log("---------------------------1-----------------------------");
        let temp = this.tree;
        needrefactor.forEach(s => {
          let obj;
          obj = temp[0]?temp.filter(a=>{return (a['key']===s.name)})[0]:null;
          // console.log(obj);
          if(obj==null){
            obj={};
            obj['key'] = s.name;
            obj['value']=[];
            obj['type']='dir';
            obj['id']=s.id;
            console.log(obj);
            temp.push(obj);
            // console.log(temp);
          }
          temp = obj['value'];
        // console.log(temp);

          if(obj['key']===last){
            obj['type']='item';
            temp.push(item);
          }
        });
        // console.log(this.tree);
        // console.log("---------------------------2-----------------------------");
      });
      this.tree=this.tree[0]['value'];
    });

    this.craftService.setSelectedNodeType(null);
  }

  ngOnInit() {
  }



  closeLeft() {
    this.craftService.setLeftPaneStat(false);
  }
}
