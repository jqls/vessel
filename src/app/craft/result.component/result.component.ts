import { Component, OnInit } from '@angular/core';
import {WorkflowNode, BasicNode} from "../drawboard.component/internal/drawboard.node";
import {ResultService} from "../result.service";

@Component({
  moduleId: module.id,
  selector: 'app-result',
  templateUrl: 'result.component.html',
  styleUrls: ['result.component.css']
})
export class ResultComponent implements OnInit {
  open: boolean;
  openedNode: WorkflowNode;
  result: string;
  error: any;
  constructor(private resultService: ResultService) {
    this.open = false;
    resultService.bookService((node: WorkflowNode): void=> {
      this.open = (node != null);
      this.openedNode = node;
      this.getResult(this.openedNode.attributes);
    });
  }
  getResult(attributes:BasicNode): void {
    this.resultService
        .getResult(attributes)
        .then(resultJson => this.result = resultJson.result)
        .catch(error => this.error = error);
  }
  ngOnInit() {
  }

}
