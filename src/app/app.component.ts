import { Component } from '@angular/core';
import {GlobalService} from "./global.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {
  title = 'app works!';
  private navpaneStat: boolean;

  constructor(private globalService: GlobalService){
    this.globalService.bookNavpaneStat((stat)=>{
      this.navpaneStat = stat;
    });

  }
}
