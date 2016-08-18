import {Injectable} from "@angular/core";
import {ProcessNode} from "./shared/json-typedef";

@Injectable()
export class DrawboardStatusService {
  private selectedNode: ProcessNode;
  private subscribers: Array<(node: ProcessNode)=>void>;

  constructor() {
    this.subscribers = Array<(node: ProcessNode)=>void>();
    this.selectedNode = null;
  }

  bookSelectedNode(update: (node: ProcessNode)=>void) {
    this.subscribers.push(update);
  }

  setSelectedNode(node: ProcessNode) {
    this.selectedNode = node;
    this.subscribers.forEach(s=>s(node));
  }

  getSelectedNode(): ProcessNode {
    return this.selectedNode;
  }

  cancelSelectedNode() {
    this.setSelectedNode(null);
  }

}
