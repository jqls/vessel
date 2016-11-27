import {Injectable} from '@angular/core';
import {WorkflowNodeType} from "../share/data-types";
import {mydebug} from "../share/my-log";
import {WorkflowNode} from "./drawboard/internal/node";
import {Relation} from "./drawboard/internal/relation";

@Injectable()
export class CraftService {
  private debug_location: string = "CrafrService";
  private selectedNodeType: WorkflowNodeType;
  private selectedNode: WorkflowNode;
  private selectedRelation: Relation;
  private SNT_subscribers: Array<(nodeType: WorkflowNodeType)=>void>;
  private SN_subscribers: Array<(node: WorkflowNode)=>void>;
  private SR_subscribers: Array<(relation: Relation)=>void>;

  constructor() {
    this.SNT_subscribers = Array<(nodeType: WorkflowNodeType)=>void>();
    this.SN_subscribers = Array<(node: WorkflowNode)=>void>();
    this.SR_subscribers = Array<(relation: Relation)=>void>();
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
    mydebug(this.debug_location, "setSelectedRelation", this.selectedRelation ? ''+this.selectedRelation.id : 'null');
    this.SR_subscribers.forEach(s => s(relation));
  }

}
