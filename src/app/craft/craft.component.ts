import {Component, OnInit} from '@angular/core';
import {CraftService} from "./craft.service";
import {GlobalService} from "../global.service";
import {DataService} from "../data.service";

@Component({
  selector: 'app-craft',
  templateUrl: './craft.component.html',
  styleUrls: ['./craft.component.sass']
})
export class CraftComponent implements OnInit {

  private isReload: boolean;

  constructor(private craftService: CraftService,
              private dataService: DataService,
              private globalService: GlobalService) {
    this.globalService.setNavpaneStat(false);
    this.isReload = this.craftService.isReload();
    this.craftService.setReload(false);

  }

  ngOnInit() {
    console.log("isReload? " + this.isReload);
    if (this.isReload) {
      this.dataService.getNodeInfo().then(item =>{
        this.reRender();
      });
    } else {
      this.craftService.setTaskName("新建任务");
      this.globalService.set_workflowID(null);
      this.globalService.flow_id = null;
      this.globalService.mission_id = null;
      this.globalService.processor_id = null;
    }

  }

  get isOpenRightPane() {
    return this.craftService.getRightPaneStat();
  }

  get isOpenLeftPane() {
    return this.craftService.getLeftPaneStat();
  }

  openRight() {
    this.craftService.setRightPaneStat(true);
  }

  openLeft() {
    this.craftService.setLeftPaneStat(true);
  }

  onSubmitClick() {
    this.craftService.submit();
  }

  reRender() {
    this.craftService.reRender();
  }
}
