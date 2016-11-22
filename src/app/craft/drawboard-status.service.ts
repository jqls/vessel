import {Injectable} from "@angular/core";
import {WorkflowNodeType, StormNodeType} from "./drawboard.component/internal/drawboard.node-types";
import {StormNode} from "./drawboard.component/internal/drawboard.node";
import {GlobalService} from "../global.service";

@Injectable()
export class DrawboardStatusService {
  private selectedNodeType: WorkflowNodeType;
  private subscribers: Array<(node: WorkflowNodeType)=>void>;
  private submitHooks: (()=>void) [] = [];
  private mytype: number;
  private taskName: string;
  constructor(private globalService: GlobalService) {
    this.subscribers = Array<(node: WorkflowNodeType)=>void>();
    this.selectedNodeType = null;
  }

  bookSelectedNodeType(update: (node: WorkflowNodeType)=>void) {
    this.subscribers.push(update);
  }

  setSelectedNodeType(node: WorkflowNodeType) {
    console.log("isStorm");
    console.log(node instanceof StormNodeType);
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
  setType(type: number){
    this.mytype = type;
  }
  getType(){
    return this.mytype;
  }
  setSubmitClickHook(fn: ()=>void) {
    this.submitHooks.push(fn);
  }
  setTaskName(name:string){
    this.taskName = name;
    this.globalService.setTaskName(name);
  }
  getTaskName(){
    return this.taskName;
  }
}
