import { AfterViewInit, Component, OnInit } from '@angular/core';
import { GlobalService } from "../global.service";

import * as $ from 'jquery';
import {environment} from "../../environments/environment";

@Component({
  selector: 'app-navpane',
  templateUrl: './navpane.component.html',
  styleUrls: ['./navpane.component.sass']
})
export class NavpaneComponent implements OnInit, AfterViewInit {
  private url_data_manager = environment.dataManager;
  private url_data_storage = environment.dataStorage;
  private isExpended: boolean;
  private clicked = false;

  constructor(private globalService: GlobalService) {
    this.globalService.bookNavpaneStat((stat: boolean) => {
      this.isExpended = stat;
    });
    this.globalService.setNavpaneStat(true);
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
    const self = this;
    $('#nav-data-analysis').click(() => {
      if (!self.clicked) {
        $('.second-nav').toggle('normal');
      }else
        self.clicked = false;
    });
  }

  onClick() {
    this.clicked = true;
    this.globalService.setNavpaneStat(true);
  }
}
