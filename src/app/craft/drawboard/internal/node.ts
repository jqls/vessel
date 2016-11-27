import * as d3 from "d3";
import {DrawboardComponent} from "../drawboard.component";
import {Relation} from "./relation";
import {Contextmenu} from "./contextmenu";
import {Dataset, Algorithm} from "../../../share/data-types";
import {mydebug} from "../../../share/my-log";

export const ELEMENT_HEIGHT = 50;
export const ELEMENT_WIDTH = 150;
export const ELEMENT_ROUND_X = 5;
export const ELEMENT_ROUND_Y = 5;

export abstract class BasicDrawboardNode {
  protected debug_location: string = "BasicDrawboardNode";
  name: string;
  flowID: number;

  protected board: DrawboardComponent;
  cx: number;
  cy: number;
  groupContainer: any; //path所属<g>
  relations: Relation[];
  // private isRendered: boolean;
  private menu: Contextmenu;


  constructor(name: string,
              flowID: number,
              board: DrawboardComponent,
              centerPosition: {x: number, y: number}) {
    mydebug(this.debug_location, "constructor", "begin");
    this.name = name;
    this.flowID = flowID;
    this.board = board;
    this.groupContainer = this.board.container.append("g");

    this.setCenterPosition(centerPosition);

    // this.isRendered = false;
    this.relations = [];
    this.initMenu();
    this.bindEventHandler();
  }

  protected setCenterPosition(p: {x: number; y: number}) {
    mydebug(this.debug_location, "setCenterPosition", "begin");
    this.cx = p['x'];
    this.cy = p['y'];
    // mydebug(this.debug_location, "setCenterPosition", "cx:cy = " + this.cx + ':' + this.cy);
    this.groupContainer.attr("transform", "translate(" + this.cx + "," + this.cy + ")");
    // mydebug(this.debug_location, "setCenterPosition", "end");
  }

  abstract toJSON(): {};

  render(): void {
    // mydebug(this.debug_location, "render", "begin");
    this.groupContainer.append("rect")
      .attr("rx", ELEMENT_ROUND_X)
      .attr("ry", ELEMENT_ROUND_Y)
      .attr("height", ELEMENT_HEIGHT)
      .attr("width", ELEMENT_WIDTH)
      .classed("basic-node", true);

    // this.groupContainer
    //   .append("text")
    //   .attr("text-anchor", "middle")
    //   .attr("dy", ELEMENT_HEIGHT / 2)
    //   .attr("dx", ELEMENT_WIDTH / 2)
    //   .append("tspan")
    //   .attr("font-size", "15px")
    //   .style("overflow", "hidden")
    //   .html(this.name);

    if (ELEMENT_WIDTH / this.name.length > 15) {
      this.groupContainer
        .append("text")
        .attr("text-anchor", "middle")
        .attr("dy", ELEMENT_HEIGHT / 2)
        .attr("dx", ELEMENT_WIDTH / 2)
        .append("tspan")
        .attr("font-size", 15)
        .html(this.name);
    } else {
      this.groupContainer
        .append("text")
        .attr("text-anchor", "middle")
        .attr("dy", ELEMENT_HEIGHT / 2)
        .attr("dx", ELEMENT_WIDTH / 2)
        .append("tspan")
        .attr("font-size", ELEMENT_WIDTH / this.name.length)
        .html(this.name);

    }
  }

  protected initMenu(): void {
    this.menu = new Contextmenu();
    this.menu.addItem("删除", this.deleteNode());
    this.menu.addMenuTo(this);
  }

  private bindEventHandler(): void {
    let self = this;
    this.groupContainer
      .on("mousedown", () => {
        console.log("node-mousedown");
        self.mousedownHandler();
      })
      .on("mouseup", () => {
        console.log("node-mouseup");
        self.mouseupHandler();
      })
      .on("mouseover", () => {
        self.mouseoverHandler();
      })
      .on("mouseout", () => {
        self.mouseoutHandler();
      });
    this.groupContainer.call(
        d3.behavior.drag()
          .on("drag", () => {
            console.log("node-drag");
            self.dragHandler();
          })
          .on("dragstart", () => {
            console.log("node-dragstart");
            self.dragstartHandler();
          })
          .on("dragend", () => {
            console.log("node-dragend");
            self.dragendHandler();
          })
      );

  }


  abstract mousedownHandler(): void;

  abstract mouseupHandler(): void;

  protected mouseoverHandler(): void {
    mydebug(this.debug_location, "mouseoverHandler", "begin");
    this.groupContainer.classed("selected", true);
  }

  protected mouseoutHandler(): void {
    mydebug(this.debug_location, "mouseoutHandler", "begin");
    this.groupContainer.classed("selected", false);
  }

  abstract dragHandler(): void;

  protected dragstartHandler(): void {
    mydebug(this.debug_location, "dragstartHandler", "begin");
    (<d3.DragEvent> d3.event).sourceEvent.stopPropagation();
  }

  protected dragendHandler(): void {
    mydebug(this.debug_location, "dragendHandler", "begin");
    this.board.update();
  }

  private deleteNode(): ()=>void {
    let self = this;
    return ()=>{
      mydebug(this.debug_location,"deleteElements","begin");
      //1.清理relations
      self.relations.forEach((relation:Relation)=>{
        //清理所连接节点的relation
        if(self.flowID == relation.from.flowID){
          relation.to.relations = relation.to.relations.filter((toRelation:Relation)=>{
            return !(toRelation.id == relation.id);
          });
        }else if (self.flowID == relation.to.flowID){
          relation.from.relations = relation.from.relations.filter((fromRelation:Relation)=>{
            return !(fromRelation.id == relation.id);
          });
        }
        //清理drawboard的relation
        self.board.relations = self.board.relations.filter((d_relation:Relation)=>{
          return !(d_relation.id == relation.id)
        });

        relation.delete();
      });
      //2.清理node
      //清理drawboard的结点
      self.board.workflowNodes = self.board.workflowNodes.filter((node:WorkflowNode)=>{
        return !(self.flowID == node.flowID);
      });
      self.groupContainer.remove();
      self.board.setSelectedNode(null);

      //清理menu
      self.menu.remove()

    }
  }
}

export class AlgorithmNode extends BasicDrawboardNode {

  nodetype: Algorithm;

  constructor(flowID: number,
              board: DrawboardComponent,
              conterPosition: {x: number, y: number},
              nodeType: Algorithm) {
    super(nodeType.name, flowID, board, conterPosition);
    this.nodetype = nodeType;

    this.debug_location = "AlgorithmNode";
  }

  toJSON(): {} {
    return {
      id: "" + this.nodetype.id,
      label: this.nodetype.name,
      description: this.nodetype.description,
      flowID: "" + this.flowID,
      parameters: this.nodetype.parameters
    };
  }

  render(): void {
    super.render();
    this.groupContainer.select("rect")
      .classed("algorithm", true);
  }

  mousedownHandler(): void {
    mydebug(this.debug_location, "mousedownHandler", "begin");
    if ((<KeyboardEvent> d3.event).shiftKey) {
      mydebug(this.debug_location, "mousedownHandler", "shift together");
      this.board.shiftDrag = true;
      this.board.dragLine.classed('hidden', false);
    } else {
      this.board.setSelectedNode(this);
    }
  }

  mouseupHandler(): void {
    mydebug(this.debug_location, "mouseupHandler", "begin");
    if (this.board.justDragged) {
      mydebug(this.debug_location, "mouseupHandler", "after shift");
      if (this.board.dragFrom != this && this != null && this.board.dragFrom != null) {
        let relation = new Relation(this.board, this.board.dragFrom, this);
        this.relations.push(relation);
        this.board.dragFrom.relations.push(relation);
        this.board.relations.push(relation);
      }
      this.board.update();
    }

  }

  dragHandler(): void {
    mydebug(this.debug_location, "dragHandler", "begin");
    this.board.justDragged = true;
    this.board.dragFrom = this;

    if (this.board.shiftDrag) {
      let mouseCoords = d3.mouse(this.board.container.node());
      mydebug(this.debug_location, "dragHandler", "x=" + mouseCoords[0] + " y=" + mouseCoords[1]);
      this.board.dragLine.classed("hidden", false);
      this.board.dragLine.attr('d', 'M' + (this.cx + ELEMENT_WIDTH / 2) + ',' + (this.cy + ELEMENT_HEIGHT / 2) + 'L' + mouseCoords[0] + ',' + mouseCoords[1]);
    } else {
      let dragEvent = (<d3.DragEvent> d3.event);
      mydebug(this.debug_location, "dragHandler", "x=" + dragEvent.dx + " y=" + dragEvent.dy);
      this.setCenterPosition({
        'x': this.cx + dragEvent.dx,
        'y': this.cy + dragEvent.dy
      });
      this.relations.forEach((value) => {
        value.update();
      });
    }
  }
}
//todo：SQL数据源是什么情况？
export class DatasetNode extends BasicDrawboardNode {
  nodetype: Dataset;

  constructor(flowID: number,
              board: DrawboardComponent,
              conterPosition: {x: number, y: number},
              nodeType: Dataset) {
    super(nodeType.name, flowID, board, conterPosition);
    this.nodetype = nodeType;

    this.debug_location = "DatasetNode";
  }

  toJSON(): {} {
    return {
      id: "" + this.nodetype.id,
      label: this.nodetype.name,
      description: this.nodetype.description,
      flowID: "" + this.flowID
    };
  }

  render(): void {
    super.render();
    this.groupContainer.select("rect")
      .classed("dataset", true);
  }

  mousedownHandler(): void {
    mydebug(this.debug_location, "mousedownHandler", "begin");
    if ((<KeyboardEvent> d3.event).shiftKey) {
      mydebug(this.debug_location, "mousedownHandler", "shift together");
      this.board.shiftDrag = true;
      this.board.dragLine.classed('hidden', false);
    } else {
      this.board.setSelectedNode(this);
    }
  }

  mouseupHandler(): void {
    mydebug(this.debug_location, "mouseupHandler", "begin");
    if (this.board.justDragged) {
      mydebug(this.debug_location, "mouseupHandler", "after shift");
      if (this.board.dragFrom != this && this != null && this.board.dragFrom != null) {
        let relation = new Relation(this.board, this.board.dragFrom, this);
        this.relations.push(relation);
        this.board.dragFrom.relations.push(relation);
        this.board.relations.push(relation);
      }
      this.board.update();
    }
  }

  dragHandler(): void {
    mydebug(this.debug_location, "dragHandler", "begin");
    this.board.justDragged = true;
    this.board.dragFrom = this;
    if (this.board.shiftDrag) {
      let mouseCoords = d3.mouse(this.board.container.node());
      mydebug(this.debug_location, "dragHandler", "x=" + mouseCoords[0] + " y=" + mouseCoords[1]);
      this.board.dragLine.classed("hidden", false);
      this.board.dragLine.attr('d', 'M' + (this.cx + ELEMENT_WIDTH / 2) + ',' + (this.cy + ELEMENT_HEIGHT / 2) + 'L' + mouseCoords[0] + ',' + mouseCoords[1]);
    } else {
      let dragEvent = (<d3.DragEvent> d3.event);
      mydebug(this.debug_location, "dragHandler", "x=" + dragEvent.dx + " y=" + dragEvent.dy);
      this.setCenterPosition({
        'x': this.cx + dragEvent.dx,
        'y': this.cy + dragEvent.dy
      });
      this.relations.forEach((value) => {
        value.update();
      });
    }
  }
}

export type WorkflowNode = AlgorithmNode | DatasetNode
