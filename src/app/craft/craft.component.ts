import { Component, OnInit } from '@angular/core';
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

  onSubmitClick() {
    this.craftService.submit();
    //todo:需要跟朱博商量状态参数问题
  }

  reRender(){
    //todo:需要跟朱博商量参数问题,要不要记录节点坐标？
    this.craftService.reRender();
  }
}
