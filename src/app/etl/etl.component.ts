import { Component, OnInit } from '@angular/core';
import { GlobalService } from "../global.service";

@Component({
  selector: 'app-etl',
  templateUrl: './etl.component.html',
  styleUrls: ['./etl.component.sass']
})
export class EtlComponent implements OnInit {

  constructor(private globalService: GlobalService) {
    this.globalService.isVisual = true;
  }

  ngOnInit() {
  }

}
