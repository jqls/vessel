import {Injectable} from '@angular/core';
import {Node} from './shared/node.class'

@Injectable()
export class DrawboardStatusService {
  private selectedNode: {};
  private subscribers: Array<(node: {})=>void>;

  constructor() {
    this.subscribers = Array<(node: {})=>void>();
    this.selectedNode = null;
  }

  bookSelectedNode(update: (node: {})=>void) {
    this.subscribers.push(update);
  }

  setSelectedNode(node: {}) {
    this.selectedNode = node;
    this.subscribers.forEach(s=>s(node));
  }

  getSelectedNode(): {} {
    return this.selectedNode;
  }

  cancelSelectedNode() {
    this.setSelectedNode(null);
  }

}
