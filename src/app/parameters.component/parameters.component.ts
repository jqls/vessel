import {Component, OnInit} from "@angular/core";
import {ParametersStatusService} from "../parameters-status.service";

@Component({
  moduleId: module.id,
  selector: 'app-parameters',
  templateUrl: 'parameters.component.html',
  styleUrls: ['parameters.component.css']
})
export class ParametersComponent implements OnInit {

  open: boolean;
  openedNode: {};

  constructor(private parametersStatus: ParametersStatusService) {
    this.open = false;
    parametersStatus.bookService((node: {})=> {
      this.open = (node != null);
      this.openedNode = node;
    });
  }

  ngOnInit() {
  }

}
