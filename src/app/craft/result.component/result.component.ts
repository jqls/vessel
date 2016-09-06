import { Component, OnInit } from '@angular/core';
import {WorkflowNode} from "../drawboard.component/internal/drawboard.node";
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
  constructor(private resultService: ResultService) {
    this.open = false;
    resultService.bookService((node: WorkflowNode): void=> {
      this.open = (node != null);
      this.openedNode = node;
      this.result = resultService.getResult();
    });
  }

  ngOnInit() {
  }

}
