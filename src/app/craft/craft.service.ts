import {Injectable} from '@angular/core';
import {WorkflowNodeType} from "../share/data-types";
import {mydebug} from "../share/my-log";
import {WorkflowNode} from "./drawboard/internal/node-basic";
import {Relation} from "./drawboard/internal/relation";
import {Headers, RequestMethod, Http} from "@angular/http";
import {environment} from "../../environments/environment";
import {handleError} from "../share/my-handler";

@Injectable()
export class CraftService {
  private debug_location: string = "CrafrService";
  private selectedNodeType: WorkflowNodeType;
  private selectedNode: WorkflowNode;
  private selectedRelation: Relation;
  private taskName: string;
  private SNT_subscribers: Array<(nodeType: WorkflowNodeType)=>void>;
  private SN_subscribers: Array<(node: WorkflowNode)=>void>;
  private SR_subscribers: Array<(relation: Relation)=>void>;
  private taskName_subscribers: Array<(taskName: string)=>void>;

  private submit_hook: () =>void;
  private reRender_hook: ()=>void;
  private rightPaneStat: boolean;
  private reload_flag: boolean;

  constructor(private http: Http) {
    this.SNT_subscribers = Array<(nodeType: WorkflowNodeType)=>void>();
    this.SN_subscribers = Array<(node: WorkflowNode)=>void>();
    this.SR_subscribers = Array<(relation: Relation)=>void>();
    this.taskName_subscribers = Array<(taskName: string)=>void>();

    this.rightPaneStat = true;
    this.reload_flag = false;
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

  bookSelectedNode(update: (node: WorkflowNode)=>void): void {
    mydebug(this.debug_location, "bookSelectedNode", 'book');
    this.SN_subscribers.push(update);
  }

  setSelectedNode(node: WorkflowNode): void {
    this.selectedNode = node;
    mydebug(this.debug_location, "setSelectedNode", this.selectedNode ? this.selectedNode.name : 'null');
    this.SN_subscribers.forEach(s => s(node));
  }

  bookSelectedRelation(update: (relation: Relation)=>void): void {
    mydebug(this.debug_location, "bookSelectedRelation", 'book');
    this.SR_subscribers.push(update);
  }

  setSelectedRelation(relation: Relation): void {
    this.selectedRelation = relation;
    mydebug(this.debug_location, "setSelectedRelation", this.selectedRelation ? '' + this.selectedRelation.id : 'null');
    this.SR_subscribers.forEach(s => s(relation));
  }

  bookTaskName(update: (taskName: string)=>void): void {
    mydebug(this.debug_location, "bookTaskName", 'book');
    this.taskName_subscribers.push(update);
    this.taskName_subscribers.forEach(fn=>fn(this.taskName));
  }

  setTaskName(taskName: string): void {
    this.taskName = taskName;
    this.taskName_subscribers.forEach(fn => fn(taskName));
  }

  getRightPaneStat(): boolean {
    return this.rightPaneStat;
  }

  setRightPaneStat(stat: boolean): void {
    this.rightPaneStat = stat;
  }

  setReload(reload: boolean){
    this.reload_flag = reload;
  }

  isReload(){
    return this.reload_flag;
  }

  setSubmitHook(getSubmitPara:()=>void){
    this.submit_hook = getSubmitPara;
}
  submit(){
    let workflowJSON = this.submit_hook();
    mydebug(this.debug_location,"submit",`${workflowJSON}`);

    let headers = new Headers({
      'Content-Type': 'application/json'
    });
    //todo:
    return this.http
      .post(environment.URL_Spark_submit, workflowJSON, {headers: headers, method: RequestMethod.Post})
      .toPromise()
      .then(res => {
        console.log(res)
      })
      .catch(handleError);
  }
  setReRenderHook(reRender:()=>void){
    this.reRender_hook = reRender;
  }
  reRender(): void{
    this.reRender_hook();
  }
}
