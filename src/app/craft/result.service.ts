import {Injectable} from "@angular/core";
import {ProcessNode} from "./drawboard.component/internal/drawboard.node";

@Injectable()
export class ResultService {
  selectedNode: ProcessNode;
  subscribers: Array<(node: ProcessNode)=>void>;

  constructor() {
    this.subscribers = Array<(node: ProcessNode)=>void>();
  }

  setSelectedNode(newNode: ProcessNode) {
    this.selectedNode = newNode;
    this.subscribers.forEach((s)=>s(newNode));
  }

  getResult() {

  }
}
