import { Component, AfterViewInit } from '@angular/core';
import { GlobalService } from "./global.service";
import * as d3 from "d3";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent implements AfterViewInit {
  ngAfterViewInit(): void {
    d3.select(".main-wrapper")
      .on("mousedown", () => {
        this.globalService.setDrawerStat(false);
      });
  }

  title = 'app works!';
  private navpaneStat: boolean;

  constructor(private globalService: GlobalService) {
    this.globalService.bookNavpaneStat((stat) => {
      this.navpaneStat = stat;
    });
    this.globalService.setLog(() => {
      $('#exampleModalLong').modal('show');
    });
  }
}
