import {Component, OnInit} from '@angular/core';
import {CraftService} from "./craft.service";
import {GlobalService} from "../global.service";

@Component({
  selector: 'app-craft',
  templateUrl: './craft.component.html',
  styleUrls: ['./craft.component.sass']
})
export class CraftComponent implements OnInit {

  private isReload: boolean;

  constructor(private craftService:CraftService,
              private globalService:GlobalService) {
    this.globalService.setNavpaneStat(false);
    this.isReload = this.craftService.isReload();
    this.craftService.setReload(false);
  }

  ngOnInit() {
    if(this.isReload){
      this.reRender();
    } else {
      this.craftService.setTaskName("新建任务");
    }

  }
  get isOpenRightPane() {return this.craftService.getRightPaneStat();}
  get isOpenLeftPane() {return this.craftService.getLeftPaneStat();}
  openRight(){
    this.craftService.setRightPaneStat(true);
  }
  openLeft(){
    this.craftService.setLeftPaneStat(true);
  }
  onSubmitClick() {
    this.craftService.submit();
  }

  reRender(){
    this.craftService.reRender();
  }
}
