import {Component, OnInit} from '@angular/core';
import {GlobalService} from "../global.service";

@Component({
  selector: 'app-navpane',
  templateUrl: './navpane.component.html',
  styleUrls: ['./navpane.component.sass']
})
export class NavpaneComponent implements OnInit {

  private isExpended: boolean;

  constructor(private globalService:GlobalService) {
    this.globalService.bookNavpaneStat((stat:boolean)=>{
      this.isExpended = stat;
    });
    this.globalService.setNavpaneStat(true);
  }

  ngOnInit() {
  }

  get panedWidth() {
    return this.isExpended ? '200px' : '50px';
  }
}
