import { Component, OnInit } from '@angular/core';
import {SafeUrl, DomSanitizer} from "@angular/platform-browser";
import {environment} from "../../environments/environment";
import {GlobalService} from "../global.service";

@Component({
  selector: 'app-data-analysis',
  templateUrl: './data-analysis.component.html',
  styleUrls: ['./data-analysis.component.sass']
})
export class DataAnalysisComponent implements OnInit {

  private session: string;
  private remoteURL: SafeUrl;

  constructor(private sanitizer: DomSanitizer,
              private globalService:GlobalService) {
    this.remoteURL = sanitizer.bypassSecurityTrustResourceUrl(`http://${environment.dataAnalysisServer}/`);
  }

  ngOnInit() {

  }

}
