import {Injectable} from '@angular/core';
import {mydebug} from "./share/my-log";
import {Http, Headers, RequestMethod} from "@angular/http";
import {environment} from "../environments/environment";
import {WorkflowNode} from "./craft/drawboard/internal/node-basic";

@Injectable()
export class GlobalService {
  private debug_location: string = "GlobalService";
  private taskName: string;
  private da_subscribers: Array<(active: boolean)=>void>;
  private navepane_subscribers: Array<(stat: boolean) => void>;
  private navepaneStat: boolean;
  private submit_hook: () => void;
  private submitAndRun_hook: () => void;
  private selectedNode: WorkflowNode;
  private workflow_subscribers: Array<(id: number) => void>;
  private workflow_id: number;
  mission_id: number;
  processor_id: number;
  flow_id: number;
  port_id: number;
  visualization: boolean;
  hasRun: boolean;
  isVisual: boolean;
  constructor(private http: Http) {
    this.navepane_subscribers = Array<(stat: boolean) => void>();
    this.da_subscribers = Array<(active: boolean)=>void>();
    this.workflow_subscribers = Array<(id: number) => void>();
    this.hasRun = false;
    this.isVisual = false;
  }

  book_workflowID(update: (id: number) => void) {
    this.workflow_subscribers.push(update);
    this.workflow_subscribers.forEach(s => s(this.workflow_id));
  }

  set_workflowID(id: number) {
    this.workflow_id = id;
    this.workflow_subscribers.forEach(s => s(id));
  }

  bookNavpaneStat(update: (stat: boolean) => void): void {
    mydebug(this.debug_location, "bookNavpaneStat", 'book');
    this.navepane_subscribers.push(update);
  }

  setNavpaneStat(stat: boolean): void {
    this.navepaneStat = stat;
    this.navepane_subscribers.forEach(fn => fn(stat));
  }

  setTaskName(taskName: string) {
    this.taskName = taskName;
  }

  getTaskName(): string {
    return this.taskName;
  }

  setSelectedNode(node: WorkflowNode) {
    this.selectedNode = node;
  }

  getSelectedNode() {
    return this.selectedNode;
  }

  bookDrawerStat(update: (active: boolean)=>void): void {
    mydebug(this.debug_location, "bookSelectedNodeType", 'book');
    this.da_subscribers.push(update);
  }
  setDrawerStat(active: boolean): void{
    this.da_subscribers.forEach(fn=>fn(active));
  }

  bookSubmit(submit: () => void) {
    this.submit_hook = submit;
  }

  bookSubmitAndRun(submit: () => void) {
    this.submitAndRun_hook = submit;
  }

  save() {
    this.submit_hook();
  }

  run() {
    console.log("workflow_id: " + this.workflow_id);
    if(environment.isMock){
      if (this.workflow_id == null) {
        this.submitAndRun_hook();
      }else
        this.mission_id = 1;
      return;
    }
    let headers = new Headers({
      'Content-Type': 'application/json'
    });
    if (this.workflow_id != null) {
      this.http.post(environment.URL_Spark_run + this.workflow_id + "/", "111", {
        headers: headers,
        method: RequestMethod.Post
      })
        .toPromise().then(response => {
          this.hasRun = true;
        mydebug(this.debug_location, "run", JSON.stringify(response.json()));
        this.mission_id = response.json().mission_id;
        return response.json();
      });
    } else {
      this.submitAndRun_hook();
    }
  }
}
