import {Component, OnInit} from '@angular/core';
import {GlobalService} from "../global.service";

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

  }

  ngOnInit() {
  }

  activeDrawer(): void {
    console.log("activeDrawer");
    console.log(this.drawerActive);
    this.drawerActive = true;
    console.log(this.drawerActive);
  }
  inactiveDrawer(): void {
    console.log("inactiveDrawer");
    console.log(this.drawerActive);
    this.drawerActive = false;
    console.log(this.drawerActive);
  }

  get drawerHeight(){return this.drawerActive?'500px':'50px';}
}
