import {Component, OnInit} from '@angular/core';
import {WorkflowNode, BasicNode} from "../drawboard.component/internal/drawboard.node";
import {ResultService} from "../result.service";
import {DrawboardStatusService} from "../drawboard-status.service";


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

  constructor(private resultService: ResultService,private drawboarstatService: DrawboardStatusService) {
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

    this.resultService.getSocketAddress(this.drawboarstatService.getTaskName(),""+this.openedNode.attributes.flowID).then(response=>{
      let url=response.url;
      console.log(url);
      var fileSocket = new WebSocket(url);
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
    });

  }


  getResult(type: number, attributes: BasicNode): void {
    this.resultService
      .getResult(type, attributes)
      .then(resultJson => this.result = resultJson.result)
      .then(response => this.request())
      .catch(error => this.error = error);
  }

  ngOnInit() {
  }

}
