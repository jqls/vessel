import {Component, OnInit} from '@angular/core';
import {WorkflowNode, BasicNode} from "../drawboard.component/internal/drawboard.node";
import {ResultService} from "../result.service";


@Component({
  // moduleId: module.id,
  selector: 'app-result',
  templateUrl: 'result.component.html',
  styleUrls: ['result.component.css']
})
export class ResultComponent implements OnInit {
  open: boolean;
  openedNode: WorkflowNode;
  result: string;
  error: any;
  private output: string = "";

  constructor(private resultService: ResultService) {
    this.open = false;
    resultService.bookService((node: WorkflowNode): void=> {
      this.open = (node != null);
      this.openedNode = node;
      this.getResult(1, this.openedNode.attributes);
    });

  }

  appendLineToOutput(newLine) {
    if (!newLine.endsWith("\n")) {
      this.output += '\n';
    }
    this.output += newLine;
  }

  request() {
    this.appendLineToOutput("try to connect file: test.log");
    var fileSocket = new WebSocket('ws://localhost:8888/connect?request_path=test.log');
    fileSocket.onerror = (evt)=> {
      this.appendLineToOutput("cannot connect to file: test.log");
    };
    fileSocket.onopen = (event)=> {
      fileSocket.onmessage = (evt)=> {
        var message = evt.data;
        this.appendLineToOutput(message);
      };
      this.appendLineToOutput("connected");
    };
    fileSocket.onclose = (evt) => {
      this.appendLineToOutput("connection closed");
    };
  }


  getResult(type: number, attributes: BasicNode): void {
    this.resultService
      .getResult(type, attributes)
      .then(resultJson => this.result = resultJson.result)
      .catch(error => this.error = error);
  }

  ngOnInit() {
  }

}
