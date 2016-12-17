import {Component, OnInit} from '@angular/core';
import {GlobalService} from "../global.service";
import * as d3 from "d3";
import {WorkflowNode} from "../craft/drawboard/internal/node-basic";

@Component({
  selector: 'app-drawer',
  templateUrl: './drawer.component.html',
  styleUrls: ['./drawer.component.sass']
})
export class DrawerComponent implements OnInit {
  private workflow_id:number;
  private debug_location = "DrawerComponent";
  private drawerActive: boolean;
  private selectedNode: WorkflowNode;
  get isSelected(){
    this.selectedNode = this.globalService.getSelectedNode();
    return this.selectedNode != null;
  }
  constructor(private globalService: GlobalService) {
    // this.globalService.bookDrawerStat((active:boolean)=>{
    //   this.drawerActive = active;
    // });
    this.drawerActive = false;
    console.log(document.body.scrollHeight);
    this.globalService.book_workflowID((id:number)=>{
      this.workflow_id = id;
    });
  }

  ngOnInit() {
  }

  activeDrawer(): void {
    console.log("activeDrawer");
    console.log(this.drawerActive);
    this.drawerActive = true;
    console.log(this.drawerActive);
    d3.select(".drawer-inner").style("height",(document.documentElement.clientHeight-116)+"px");
  }
  inactiveDrawer(): void {
    console.log("inactiveDrawer");
    console.log(this.drawerActive);
    this.drawerActive = false;
    console.log(this.drawerActive);
    d3.select(".drawer-inner").style("height","60px");
  }

  onClick(){
    this.globalService.setNavpaneStat(false);
    this.drawerActive = false;
    d3.select(".drawer-inner").style("height","60px");
  }
  onRun(){
    this.globalService.run();
  }

  onSave(){
    this.globalService.save();
  }
}
