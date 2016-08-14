import {Injectable} from '@angular/core';
import {Node} from './shared/node.class'

@Injectable()
export class DrawboardStatusService {
  private selectedNode: {};

  constructor() {
    this.selectedNode = null;
  }

  setSelectedNode(node: {}) {
    this.selectedNode = node;
  }

  getSelectedNode(): {} {
    return this.selectedNode;
  }

  cancelSelectedNode() {
    this.selectedNode = null;
  }

}
