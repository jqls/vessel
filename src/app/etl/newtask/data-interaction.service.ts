import {Injectable} from '@angular/core';
import {DatabaseNodeType} from "./share/node-types";
import {DatabaseNode} from "./drawboard/internal/node";
import {Relation} from "./drawboard/internal/relation";

@Injectable()
export class DataInteractionService {
//   private debug_location: string = "CrafrService";
  private selectedNodeType: DatabaseNodeType;
  private selectedNode: DatabaseNode;
  private selectedRelation: Relation;
  private taskName: string;

  //与NewTaskCOmponent进行交互,记录所有节点
  private workflowNodes: DatabaseNode[];
  private relations: Relation[];

  private SNT_subscribers: Array<(nodeType: DatabaseNodeType)=>void>;
  private SN_subscribers: Array<(node: DatabaseNode)=>void>;
  private SR_subscribers: Array<(relation: Relation)=>void>;
  private taskName_subscribers: Array<(taskName: string)=>void>;
  private workflowNodes_subscribers: Array<(workflowNodes: DatabaseNode[])=>void>;
  private relations_subscribers: Array<(relations: Relation[])=>void>;

  private rightPaneStat: boolean;

  constructor() {
    this.SNT_subscribers = Array<(nodeType: DatabaseNodeType)=>void>();
    this.SN_subscribers = Array<(node: DatabaseNode)=>void>();
    this.SR_subscribers = Array<(relation: Relation)=>void>();
    this.taskName_subscribers = Array<(taskName: string)=>void>();
    this.workflowNodes_subscribers = Array<(workflowNodes: DatabaseNode[])=>void>();
    this.relations_subscribers = Array<(relations: Relation[])=>void>();

    this.rightPaneStat = true;
    this.workflowNodes = [];
    this.relations = [];
  }

  bookSelectedNodeType(update: (nodeType: DatabaseNodeType)=>void): void {
    // mydebug(this.debug_location, "bookSelectedNodeType", 'book');
    this.SNT_subscribers.push(update);
  }

  setSelectedNodeType(nodeType: DatabaseNodeType): void {
    this.selectedNodeType = nodeType;
    // mydebug(this.debug_location, "setSelectedNodeType", this.selectedNodeType ? this.selectedNodeType.name : 'null');
    this.SNT_subscribers.forEach(s => s(nodeType));
  }

  bookSelectedNode(update: (node: DatabaseNode)=>void): void {
    // mydebug(this.debug_location, "bookSelectedNode", 'book');
    this.SN_subscribers.push(update);
  }

  setSelectedNode(node: DatabaseNode): void {
    this.selectedNode = node;
    // mydebug(this.debug_location, "setSelectedNode", this.selectedNode ? this.selectedNode.name : 'null');
    this.SN_subscribers.forEach(s => s(node));
  }

  bookSelectedRelation(update: (relation: Relation)=>void): void {
    // mydebug(this.debug_location, "bookSelectedRelation", 'book');
    this.SR_subscribers.push(update);
  }

  setSelectedRelation(relation: Relation): void {
    this.selectedRelation = relation;
    // mydebug(this.debug_location, "setSelectedRelation", this.selectedRelation ? '' + this.selectedRelation.id : 'null');
    this.SR_subscribers.forEach(s => s(relation));
  }

  bookTaskName(update: (taskName: string)=>void): void {
    // mydebug(this.debug_location, "bookTaskName", 'book');
    this.taskName_subscribers.push(update);
  }

  setTaskName(taskName: string): void {
    this.taskName = taskName;
    this.taskName_subscribers.forEach(fn => fn(taskName));
  }

  bookWorflowNodes(update: (workflowNodes: DatabaseNode[])=>void): void{
    this.workflowNodes_subscribers.push(update);
  }

  setWorflowNodes(workflowNodes: DatabaseNode[]): void {
    this.workflowNodes = workflowNodes;
    this.workflowNodes_subscribers.forEach(fn => fn(workflowNodes));
  }

  bookRelations(update: (relations: Relation[])=>void): void{
    this.relations_subscribers.push(update);
  }

  setRelations(relations: Relation[]): void {
    this.relations = relations;
    this.relations_subscribers.forEach(fn => fn(relations));
  }

  getRightPaneStat(): boolean {
    return this.rightPaneStat;
  }

  setRightPaneStat(stat: boolean): void {
    this.rightPaneStat = stat;
  }
}
