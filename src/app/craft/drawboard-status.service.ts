import {Injectable} from "@angular/core";
import {ProcessNode, DataSourceNode} from "../shared/json-typedef";

@Injectable()
export class DrawboardStatusService {
  private selectedNode: DataSourceNode|ProcessNode;
  private subscribers: Array<(node: DataSourceNode|ProcessNode)=>void>;

  constructor() {
    this.subscribers = Array<(node: ProcessNode)=>void>();
    this.selectedNode = null;
  }

  bookSelectedNode(update: (node: ProcessNode)=>void) {
    this.subscribers.push(update);
  }

  setSelectedNode(node: DataSourceNode|ProcessNode) {
    this.selectedNode = node;
    this.subscribers.forEach(s=>s(node));
  }

  getSelectedNode(): DataSourceNode|ProcessNode {
    return this.selectedNode;
  }

  cancelSelectedNode() {
    this.setSelectedNode(null);
  }

}
