import {Component, OnInit} from "@angular/core";
import {ParametersStatusService} from "../parameters-status.service";
import {ProcessNode} from "../shared/json-typedef";

@Component({
  moduleId: module.id,
  selector: 'app-parameters',
  templateUrl: 'parameters.component.html',
  styleUrls: ['parameters.component.css']
})
export class ParametersComponent implements OnInit {

  open: boolean;
  openedNode: ProcessNode;

  constructor(private parametersStatus: ParametersStatusService) {
    this.open = false;
    parametersStatus.bookService((node: ProcessNode)=> {
      this.open = (node != null);
      this.openedNode = node;
    });
  }

  ngOnInit() {
  }

}
