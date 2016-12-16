import {Component, OnInit} from '@angular/core';
import {GlobalService} from "../global.service";
import * as d3 from "d3";

@Component({
  selector: 'app-drawer',
  templateUrl: './drawer.component.html',
  styleUrls: ['./drawer.component.sass']
})
export class DrawerComponent implements OnInit {
  private debug_location = "DrawerComponent";
  private drawerActive: boolean;

  constructor(private globalService: GlobalService) {
    // this.globalService.bookDrawerStat((active:boolean)=>{
    //   this.drawerActive = active;
    // });
    this.drawerActive = false;
    console.log(document.body.scrollHeight);
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
}
