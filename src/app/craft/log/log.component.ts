import {Component, OnInit} from '@angular/core';
import {WorkflowNode} from "../drawboard/internal/node-basic";
import {CraftService} from "../craft.service";
import {DataService} from "../../data.service";
import {mydebug} from "../../share/my-log";

@Component({
  selector: 'app-log',
  templateUrl: './log.component.html',
  styleUrls: ['./log.component.sass']
})
export class LogComponent implements OnInit {
  private debug_location: string = "LogComponent";
  private selectedNode: WorkflowNode;
  private taskName: string;
  private output: string = "";

  constructor(private craftService: CraftService,
              private dataService: DataService) {
    //订阅selectedNode
    this.craftService.bookSelectedNode((node: WorkflowNode) => {
      this.selectedNode = node;
      this.request();
    });

    this.craftService.bookTaskName((taskName: string) => {
      this.taskName = taskName;
    });
  }

  ngOnInit() {
  }

  private request() {
    this.appendLineToOutput("try to connect file: test.log");

    this.dataService.getSocketAddress(this.taskName, "" + this.selectedNode.flowID).then(response => {
      let url = response.url;
      mydebug(this.debug_location, "request", url);
      var fileSocket = new WebSocket(url);
      fileSocket.onerror = (evt) => {
        this.appendLineToOutput("cannot connect to file: test.log");
      };

      fileSocket.onopen = (event) => {
        fileSocket.onmessage = (evt) => {
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

  private appendLineToOutput(newLine: string) {
    if (!newLine.endsWith("\n")) {
      this.output += '\n';
    }
    this.output += newLine;
  }
}
