import {Component, OnInit} from '@angular/core';
import {GlobalService} from "../global.service";
import * as d3 from "d3";
import {WorkflowNode} from "../craft/drawboard/internal/node-basic";
import {Router} from "@angular/router";

@Component({
  selector: 'app-drawer',
  templateUrl: './drawer.component.html',
  styleUrls: ['./drawer.component.sass']
})
export class DrawerComponent implements OnInit {
  private workflow_id: number;
  private debug_location = "DrawerComponent";
  private drawerActive: boolean;
  private selectedNode: WorkflowNode;

  get isSelected() {
    this.selectedNode = this.globalService.getSelectedNode();
    return this.selectedNode != null;
  }

  constructor(private router: Router,
              private globalService: GlobalService) {
    this.globalService.bookDrawerStat((active: boolean) => {
      if (active)
        this.activeDrawer();
      else
        this.inactiveDrawer();
    });
    this.drawerActive = false;
    console.log(document.body.scrollHeight);
    this.globalService.book_workflowID((id: number) => {
      this.workflow_id = id;
    });
  }

  get isVisualise() {
    return this.globalService.isVisual
  }

  ngOnInit() {
  }

  activeDrawer(): void {
    console.log("activeDrawer");
    console.log(this.drawerActive);
    this.drawerActive = true;
    console.log(this.drawerActive);
    d3.select(".drawer-inner").style("height", (document.documentElement.clientHeight - 116) + "px");
  }

  inactiveDrawer(): void {
    console.log("inactiveDrawer");
    console.log(this.drawerActive);
    this.drawerActive = false;
    console.log(this.drawerActive);
    d3.select(".drawer-inner").style("height", "60px");
  }

  onClick(str: string) {
    this.globalService.setNavpaneStat(false);
    this.drawerActive = false;
    d3.select(".drawer-inner").style("height", "60px");
    // if(str==='/Experiment')
    this.router.navigateByUrl('').then(res => {
      this.router.navigateByUrl(str);
    });
    // else
    //   this.router.navigateByUrl(str);
  }
  onRun() {
    if (this.isVisualise)
      return false;
    this.globalService.run();
  }

  onSave() {
    if (this.isVisualise)
      return false;
    this.globalService.save();
  }

  gotoRunHistory() {
    if (this.isVisualise)
      return false;
    this.router.navigate(['/RunHistory']);
  }
}
