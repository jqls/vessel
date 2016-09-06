import {Injectable} from "@angular/core";
import {BasicNode, ProcessNode, WorkflowNode} from "./drawboard.component/internal/drawboard.node";

@Injectable()
export class ResultService {
  selectedNode: ProcessNode;
  subscribers: Array<(node: ProcessNode)=>void>;

  constructor() {
    this.subscribers = Array<(node: ProcessNode)=>void>();
  }

  bookService(bookFunction: (node: WorkflowNode)=>void) {
    this.subscribers.push(bookFunction);
  }

  setSelectedNode(newNode: ProcessNode) {
    this.selectedNode = newNode;
    this.subscribers.forEach((s)=>s(newNode));
  }

  getResult(attributes:BasicNode) {

    return "Over" + attributes.flowID;
  }
}
