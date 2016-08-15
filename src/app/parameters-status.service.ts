import {Injectable} from "@angular/core";

@Injectable()
export class ParametersStatusService {

  selectedNode: {};
  subscribers: Array<(node: {})=>void>;

  constructor() {
    this.subscribers = Array<(node: {})=>void>();
  }

  bookService(bookFunction: (node: {})=>void) {
    this.subscribers.push(bookFunction);
  }

  setSelectedNode(newNode: {}) {
    this.selectedNode = newNode;
    this.subscribers.forEach((s)=>s(newNode))
  }

}
