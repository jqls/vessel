import {Injectable} from '@angular/core';
import {WorkflowNodeType} from "../share/data-types";
import {mydebug} from "../share/my-log";
import {WorkflowNode} from "./drawboard/internal/node-basic";
import {Relation} from "./drawboard/internal/relation";
import {Headers, RequestMethod, Http} from "@angular/http";
import {environment} from "../../environments/environment";
import {handleError} from "../share/my-handler";
import {GlobalService} from "../global.service";
import {DrawboardComponent} from "./drawboard/drawboard.component";
import {NodeStat, DatabaseRequest1, DatabaseRequest2} from "../share/json-types";

@Injectable()
export class CraftService {
  private debug_location: string = "CrafrService";
  private selectedNodeType: WorkflowNodeType;
  private selectedNode: WorkflowNode;
  private selectedRelation: Relation;
  private taskName: string;
  private SNT_subscribers: Array<(nodeType: WorkflowNodeType) => void>;
  private SN_subscribers: Array<(node: WorkflowNode) => void>;
  private SR_subscribers: Array<(relation: Relation) => void>;
  private taskName_subscribers: Array<(taskName: string) => void>;
  private showVisual_subscribers: Array<(isshow: boolean) => void>;

  private submit_hook: () => void;
  private reRender_hook: () => void;
  private rightPaneStat: boolean;
  private leftPaneStat: boolean;
  private reload_flag: boolean;
  private visual_stat: boolean;
  private workflow_id: number;

  drawboard: DrawboardComponent;

  constructor(private globalService: GlobalService,
              private http: Http) {
    this.SNT_subscribers = Array<(nodeType: WorkflowNodeType) => void>();
    this.SN_subscribers = Array<(node: WorkflowNode) => void>();
    this.SR_subscribers = Array<(relation: Relation) => void>();
    this.taskName_subscribers = Array<(taskName: string) => void>();
    this.showVisual_subscribers = Array<(isshow: boolean) => void>();

    this.rightPaneStat = true;
    this.leftPaneStat = true;
    this.reload_flag = false;

    this.globalService.bookSubmit(() => {
      this.submit();
    });
    this.globalService.bookSubmitAndRun(() => {
      this.submitAndRun()
    });
    this.globalService.book_workflowID((id) => {
      this.workflow_id = id
    });
  }

  get hasRun(): boolean {
    return this.globalService.hasRun;
  };

  bookSelectedNodeType(update: (nodeType: WorkflowNodeType) => void): void {
    mydebug(this.debug_location, "bookSelectedNodeType", 'book');
    this.SNT_subscribers.push(update);
  }

  setSelectedNodeType(nodeType: WorkflowNodeType): void {
    this.selectedNodeType = nodeType;
    mydebug(this.debug_location, "setSelectedNodeType", this.selectedNodeType ? this.selectedNodeType.name : 'null');
    this.SNT_subscribers.forEach(s => s(nodeType));
  }

  bookSelectedNode(update: (node: WorkflowNode) => void): void {
    mydebug(this.debug_location, "bookSelectedNode", 'book');
    this.SN_subscribers.push(update);
  }

  setSelectedNode(node: WorkflowNode): void {
    this.selectedNode = node;
    mydebug(this.debug_location, "setSelectedNode", this.selectedNode ? this.selectedNode.name : 'null');
    this.SN_subscribers.forEach(s => s(node));
    this.globalService.setSelectedNode(node);
  }

  bookSelectedRelation(update: (relation: Relation) => void): void {
    mydebug(this.debug_location, "bookSelectedRelation", 'book');
    this.SR_subscribers.push(update);
  }

  setSelectedRelation(relation: Relation): void {
    this.selectedRelation = relation;
    mydebug(this.debug_location, "setSelectedRelation", this.selectedRelation ? '' + this.selectedRelation.id : 'null');
    this.SR_subscribers.forEach(s => s(relation));
  }

  bookTaskName(update: (taskName: string) => void): void {
    mydebug(this.debug_location, "bookTaskName", 'book');
    this.taskName_subscribers.push(update);
    //防止后订阅的观察者无法取得值
    this.taskName_subscribers.forEach(fn => fn(this.taskName));
  }

  setTaskName(taskName: string): void {
    this.taskName = taskName;
    this.globalService.setTaskName(taskName);
    this.taskName_subscribers.forEach(fn => fn(taskName));
  }

  bookVisualStat(update: (isshow: boolean) => void): void {
    mydebug(this.debug_location, "bookVisualStat", 'book');
    this.showVisual_subscribers.push(update);
    //防止后订阅的观察者无法取得值
    this.showVisual_subscribers.forEach(fn => fn(this.visual_stat));
  }

  setVisualStat(isshow: boolean): void {
    this.visual_stat = isshow;
    this.showVisual_subscribers.forEach(fn => fn(isshow));
  }

  getRightPaneStat(): boolean {
    return this.rightPaneStat;
  }

  setRightPaneStat(stat: boolean): void {
    this.rightPaneStat = stat;
  }

  getLeftPaneStat(): boolean {
    return this.leftPaneStat;
  }

  setLeftPaneStat(stat: boolean): void {
    this.leftPaneStat = stat;
  }

  setReload(reload: boolean) {
    this.reload_flag = reload;
  }

  isReload() {
    return this.reload_flag;
  }

  setSubmitHook(getSubmitPara: () => void) {
    this.submit_hook = getSubmitPara;
  }

  submit() {
    let workflowJSON = this.submit_hook();
    mydebug(this.debug_location, "submit", `${workflowJSON}`);

    let headers = new Headers({
      'Content-Type': 'application/json'
    });
    return this.http
      .post(environment.URL_Spark_save, workflowJSON, {headers: headers, method: RequestMethod.Post})
      .toPromise()
      .then(res => {
        // console.log(res);
        // console.log(res.json());
        console.log(res.json().workflow_id);
        this.globalService.set_workflowID(res.json().workflow_id);
      })
      .catch(handleError);
  }

  submitAndRun() {

    let workflowJSON = this.submit_hook();
    mydebug(this.debug_location, "submit", `${workflowJSON}`);
    if(environment.isMock){
      this.globalService.set_workflowID(1);
      this.globalService.run();
      return;
    }
    let headers = new Headers({
      'Content-Type': 'application/json'
    });
    return this.http
      .post(environment.URL_Spark_save, workflowJSON, {headers: headers, method: RequestMethod.Post})
      .toPromise()
      .then(res => {
        // console.log(res);
        // console.log(res.json());
        let response = res.json().workflow_id;

        console.log(response);
        if (response != null) {
          this.globalService.set_workflowID(res.json().workflow_id);
          this.globalService.run();
        }
      })
      .catch(handleError);
  }

  setReRenderHook(reRender: () => void) {
    this.reRender_hook = reRender;
  }

  reRender(): void {
    this.reRender_hook();
  }

  getNodeStat() {
    if(environment.isMock){
      return this.http.get("app/processor_stat").toPromise().then(response=>{
        console.log("----------------------------------");
        console.log(response.json().data);

        return response.json().data as NodeStat[];
      });
    }else{
      if (this.workflow_id != null && this.globalService.mission_id != null) {
        return this.http.get(environment.URL_Spark_processor_stat + this.workflow_id + "-" + this.globalService.mission_id).toPromise().then(response => {
          console.log("----------------------------------");
          console.log(response.json());
          return response.json() as NodeStat[];
        });
      } else {
        alert("-----workflow_id 或 mission_id 为空-----");
      }
    }
  }

  getDatabasePara(value: any, id: number) {
    console.log("--------------------getDatabasePara-------------------------");
    console.log(environment.URL_Spark_SQL+"1/"+`?database=${value}`+`&processor_id=${id}`);
    return this.http.get(environment.URL_Spark_SQL+"1/"+`?database=${value}`+`&processor_id=${id}`).toPromise().then(res=>{
      return res.json().parameters;
    }).catch(handleError);
  }
  getDatabaseTable(value: any, id: number){
    console.log("--------------------getDatabaseTable-------------------------");
    console.log(environment.URL_Spark_SQL+"2/"+`?database=${value}`+`&processor_id=${id}`);
    return this.http.get(environment.URL_Spark_SQL+"2/"+`?database=${value}`+`&processor_id=${id}`).toPromise().then(res=>{
      return res.json().parameters;
    }).catch(handleError);
  }
  onDatabaseAttrSet(request: DatabaseRequest1) {
    console.log("--------------------onDatabaseAttrSet-------------------------");
    console.log(JSON.stringify(request));
    let headers = new Headers({
      'Content-Type': 'application/json'
    });
    return this.http.post(environment.URL_Spark_SQL+"0/",JSON.stringify(request),{headers: headers, method: RequestMethod.Post})
      .toPromise()
      .then(res=>res.json());
  }
  getDatabaseColum(value: any, id: number){
    console.log("--------------------getDatabaseColum-------------------------");
    console.log(environment.URL_Spark_SQL+"3/"+`?database=${value}`+`&processor_id=${id}`);
    return this.http.get(environment.URL_Spark_SQL+"3/"+`?database=${value}`+`&processor_id=${id}`).toPromise().then(res=>{
      return res.json().parameters;
    }).catch(handleError);
  }
  onTableSelect(request: DatabaseRequest2){
    console.log("--------------------onTableSelect-------------------------");
    console.log(JSON.stringify(request));
    let headers = new Headers({
      'Content-Type': 'application/json'
    });
    return this.http.post(environment.URL_Spark_SQL+"1/",JSON.stringify(request),{headers: headers, method: RequestMethod.Post})
      .toPromise()
      .then(res=>res.json());
  }
}
