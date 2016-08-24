import {Injectable} from "@angular/core";
import {ProcessNodeType} from "./drawboard.component/internal/drawboard.node";
import {WorkflowNodeType} from "./drawboard.component/internal/drawboard.node-types";

@Injectable()
export class DrawboardStatusService {
  private selectedNodeType: WorkflowNodeType;
  private subscribers: Array<(node: ProcessNodeType)=>void>;
  private submitHooks: (()=>void) [] = [];

  constructor() {
    this.subscribers = Array<(node: ProcessNodeType)=>void>();
    this.selectedNodeType = null;
  }

  bookSelectedNodeType(update: (node: ProcessNodeType)=>void) {
    this.subscribers.push(update);
  }

  setSelectedNodeType(node: WorkflowNodeType) {
    this.selectedNodeType = node;
    if (node instanceof ProcessNodeType) {
      this.subscribers.forEach(s=>s(node));
    }
  }

  getSelectedNode(): WorkflowNodeType {
    return this.selectedNodeType;
  }

  cancelSelectedNode() {
    this.setSelectedNodeType(null);
  }

  onSubmitClick() {
    this.submitHooks.forEach((fn)=> {
      fn();
    })
  }

  setSubmitClickHook(fn: ()=>void) {
    this.submitHooks.push(fn);
  }

}
