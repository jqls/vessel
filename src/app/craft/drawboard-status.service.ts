import {Injectable} from "@angular/core";
import {WorkflowNodeType} from "./drawboard.component/internal/drawboard.node-types";

@Injectable()
export class DrawboardStatusService {
  private selectedNodeType: WorkflowNodeType;
  private subscribers: Array<(node: WorkflowNodeType)=>void>;
  private submitHooks: (()=>void) [] = [];

  constructor() {
    this.subscribers = Array<(node: WorkflowNodeType)=>void>();
    this.selectedNodeType = null;
  }

  bookSelectedNodeType(update: (node: WorkflowNodeType)=>void) {
    this.subscribers.push(update);
  }

  setSelectedNodeType(node: WorkflowNodeType) {
    this.selectedNodeType = node;
    this.subscribers.forEach(s=>s(node));
  }

  getSelectedNodeType(): WorkflowNodeType {
    return this.selectedNodeType;
  }

  cancelSelectedNodeType() {
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
