import {Component, OnInit} from '@angular/core';
import {GlobalService} from "../global.service";

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.sass']
})
export class UploadComponent implements OnInit {

  constructor(private globalService: GlobalService) {
    this.globalService.setNavpaneStat(true);
  }

  ngOnInit() {
  }

}
