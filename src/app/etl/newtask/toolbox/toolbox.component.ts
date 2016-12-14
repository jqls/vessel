import {Component, OnInit} from '@angular/core';
import { ToolboxList } from './toollist';
import { DatabaseNodeType, SqlDatabase, NosqlDatabase } from '../share/node-types';
import { DataInteractionService } from '../data-interaction.service';

@Component({
  selector: 'etl-toolbox',
  templateUrl: './toolbox.component.html',
  styleUrls: ['./toolbox.component.sass']
})
export class EtlToolboxComponent implements OnInit{
    private toolbox_list: ToolboxList;
    sql_list: Array<string> = ['MySql', 'Oracle'];
    nosql_list: Array<string> = ['Hdfs', 'Hive', 'Hbase'];
    selectedNodeType: DatabaseNodeType;

    constructor(private service: DataInteractionService) {
      //通过订阅者模式保证本地与CraftService中的selectedNodeType的一致
      this.service.bookSelectedNodeType((nodeType: DatabaseNodeType) => {
        this.selectedNodeType = nodeType;
        // mydebug(this.debug_location, "craftService.bookSelectedNodeType", String(this.selectedNodeType == null));
      });
      this.service.setSelectedNodeType(null);
    }

    //是否折叠
    collapse_tag = {
      sql: 0,
      nosql: 0
    };

    itemClick($event:any, item: DatabaseNodeType){
      // var t = $event.target;
      // console.log("Testing $event"+ t);
      if (this.selectedNodeType == item) {
        this.service.setSelectedNodeType(null);        
      } else {
        this.service.setSelectedNodeType(item);
      }
      console.log(this.selectedNodeType? this.selectedNodeType: "Nothing selected");
      console.log(this.selectedNodeType? this.selectedNodeType.parameters[3]:"Nothing selected");
    }

    // getExpand(event: Event){
    //   console.log("asd");
    //   var target = event.target;

    //   console.log(target);
    // }
    ngOnInit(){
      this.toolbox_list = new ToolboxList();//当前的toolbox中所有的数据库列表

       console.log(this.toolbox_list.SqlList[0].label+ "fgjaojgajo");
    }

    changeCollapse(s: string){//改变左侧的三角形箭头方向
      var t: any;
      if(s == "sql"){
        t = document.getElementById("sql-tag");
      }
      if(s == "nosql"){
        t = document.getElementById("nosql-tag");
      }
      t.className = (t.className=="fa fa-caret-down fa-fw")?"fa fa-caret-right fa-fw":"fa fa-caret-down fa-fw";
    }
}