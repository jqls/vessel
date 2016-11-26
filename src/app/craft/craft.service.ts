import {Injectable} from '@angular/core';
import {WorkflowNodeType} from "../share/data-types";
import {mydebug} from "../share/my-log";

@Injectable()
export class CraftService {
  private debug_location: string = "CrafrService";
  private selectedNodeType: WorkflowNodeType;
  private SNT_subscribers: Array<(nodeType: WorkflowNodeType)=>void>;

  constructor() {
    this.SNT_subscribers = Array<(node: WorkflowNodeType)=>void>();
  }

  bookSelectedNodeType(update: (nodeType: WorkflowNodeType)=>void): void {
    mydebug(this.debug_location, "bookSelectedNodeType", 'book');
    this.SNT_subscribers.push(update);
  }

  setSelectedNodeType(nodeType: WorkflowNodeType): void {
    this.selectedNodeType = nodeType;
    mydebug(this.debug_location, "setSelectedNodeType", this.selectedNodeType ? this.selectedNodeType.name : 'null');
    this.SNT_subscribers.forEach(s => s(nodeType));
  }


}
