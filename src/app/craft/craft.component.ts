import {Component, OnInit, ViewChild} from '@angular/core';
import {CraftService} from "./craft.service";
import {GlobalService} from "../global.service";
import {DataService} from "../data.service";
import {DrawboardComponent} from "./drawboard/drawboard.component";

@Component({
  selector: 'app-craft',
  templateUrl: './craft.component.html',
  styleUrls: ['./craft.component.sass']
})
export class CraftComponent implements OnInit {

  private isReload: boolean;
  private show_visual: boolean;
  private visualization:boolean;
  @ViewChild(DrawboardComponent) private drawboard: DrawboardComponent;
  constructor(private craftService: CraftService,
              private dataService: DataService,
              private globalService: GlobalService) {
    this.globalService.setNavpaneStat(false);
    this.isReload = this.craftService.isReload();
    this.craftService.setReload(false);
    this.craftService.bookVisualStat((isshow)=>{
      this.show_visual = isshow;
    });
    this.craftService.setVisualStat(false);
    this.globalService.hasRun = false;
  }

  ngOnInit() {
    console.log("isReload? " + this.isReload);
    if (this.isReload) {
      this.globalService.hasRun = true;
      this.dataService.getNodeInfo().then(() =>{
        this.reRender();
      });
    } else {
      this.craftService.setTaskName("新建任务");
      this.globalService.set_workflowID(null);
      this.globalService.flow_id = null;
      this.globalService.mission_id = null;
      this.globalService.processor_id = null;
    }
    this.drawboard.setVisualise(()=>{this.gotoVisualise();});

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

  reRender() {
    this.craftService.reRender();
  }
  gotoVisualise(){
    this.visualization = this.globalService.visualization;
    this.globalService.isVisual = true;
    this.craftService.setVisualStat(true);
  }
  onVisualClose(){
    this.globalService.isVisual = false;
    this.craftService.setVisualStat(false);
  }
}
