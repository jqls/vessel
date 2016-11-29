import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-navpane',
  templateUrl: './navpane.component.html',
  styleUrls: ['./navpane.component.sass']
})
export class NavpaneComponent implements OnInit {

  private isExpended: boolean;

  constructor() {
    this.isExpended = true;
  }

  ngOnInit() {
  }

  setIsExpended(p: boolean) {
    this.isExpended = p;
  }

  get panedWidth() {
    return this.isExpended ? '200px' : '50px';
  }
}
