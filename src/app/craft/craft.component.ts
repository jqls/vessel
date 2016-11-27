import { Component, OnInit } from '@angular/core';
import {CraftService} from "./craft.service";

@Component({
  selector: 'app-craft',
  templateUrl: './craft.component.html',
  styleUrls: ['./craft.component.sass']
})
export class CraftComponent implements OnInit {

  constructor(private craftService:CraftService) { }

  ngOnInit() {
  }
  get isOpenRightPane() {return this.craftService.getRightPaneStat();}
}
