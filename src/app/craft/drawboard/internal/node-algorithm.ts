import * as d3 from "d3";
import {DrawboardComponent} from "../drawboard.component";
import {Relation} from "./relation";
import {Algorithm} from "../../../share/data-types";
import {mydebug} from "../../../share/my-log";
import {BasicDrawboardNode, ELEMENT_WIDTH, ELEMENT_HEIGHT} from "./node-basic";

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