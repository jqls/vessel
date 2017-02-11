import { Component, OnInit } from '@angular/core';
import { GlobalService } from "../../global.service";

@Component({
  selector: 'app-upload-dataset',
  templateUrl: './upload-dataset.component.html',
  styleUrls: ['./upload-dataset.component.sass']
})
export class UploadDatasetComponent implements OnInit {

  constructor(private globalService: GlobalService) {
    this.globalService.isVisual = true;
  }

  ngOnInit() {
  }

}
