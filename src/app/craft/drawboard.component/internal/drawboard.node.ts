import {ParameterJSON, DataSourceNodeType, ProcessNodeType} from "./drawboard.node-types";
import {DrawboardElement, ELEMENT_WIDTH, ELEMENT_HEIGHT, ELEMENT_ROUND_X, ELEMENT_ROUND_Y} from "./drawboard.element";
import {DrawboardComponent} from "../drawboard.component";
import {Relation} from "./drawboard.relation";
/**
 * Created by tang on 2016/8/24.
 */

export type BasicNode = {
  id: string,
  label: string,
  description: string,
  flowID: number
}

export class ProcessNode extends DrawboardElement {
  algorithmParameters: ParameterJSON[];

  constructor(nodeType: ProcessNodeType,
              flowID: number,
              board: DrawboardComponent,
              position: {x: number, y: number},) {
    this.algorithmParameters = JSON.parse(JSON.stringify(nodeType.algorithmParameters));
    super(board, position, flowID, nodeType);
    this.bindEventHandler();
  }

  toJSON(): string {
    return JSON.stringify(this.attributes);
  }

  render() {
    if (!this.rendered) {
      this.groupContainer.append("rect")
        .attr("rx", ELEMENT_ROUND_X)
        .attr("ry", ELEMENT_ROUND_Y)
        .attr("height", ELEMENT_HEIGHT)
        .attr("width", ELEMENT_WIDTH)
        .classed("data-source", true);
      this.groupContainer
        .append("text")
        .attr("text-anchor", "middle")
        .attr("dy", ELEMENT_HEIGHT / 2)
        .attr("dx", ELEMENT_WIDTH / 2)
        .append("tspan")
        .html(this.attributes.label);
    }
    this.rendered = true;
  }

  bindEventHandler() {
    let self = this;

    this.groupContainer
      .on("mousedown", function () {
        console.log("mousedown");
        if ((<KeyboardEvent> d3.event).shiftKey) {
          console.log("shift");
          self.board.shiftDrag = true;
          self.board.dragLine.classed('hidden', false);
          return;
        } else {
          self.board.setParameter(self);
        }
      })
      .on("mouseup", function () {
        if (self.board.justDragged) {
          if (self.board.dragFrom != self && self != null && self.board.dragFrom != null) {
            let relation = new Relation(self.board, self.board.dragFrom, self);
            self.relations.push(relation);
            self.board.dragFrom.relations.push(relation);
          }
        }
        self.board.update();
      })
      .on("mouseover", function () {
        if (self.board.shiftDrag) {
          self.groupContainer.classed("selected", true);
        }
      })
      .on("mouseout", function () {
        self.groupContainer.classed("selected", false);
      })
      .call(
        d3.behavior.drag()
          .on("dragstart", function () {
            (<d3.DragEvent> d3.event).sourceEvent.stopPropagation();
          })
          .on("drag", function () {
            self.board.justDragged = true;
            self.board.dragFrom = self;
            if (self.board.shiftDrag) {
              let mouseCoords = d3.mouse(self.board.container.node());
              self.board.dragLine.classed("hidden", false);
              self.board.dragLine.attr('d', 'M' + (self.cx + ELEMENT_WIDTH / 2) + ',' + (self.cy + ELEMENT_HEIGHT / 2) + 'L' + mouseCoords[0] + ',' + mouseCoords[1]);
            } else {
              let dragEvent = <d3.DragEvent> d3.event;
              self.setCenterPosition({
                'x': self.cx + dragEvent.dx,
                'y': self.cy + dragEvent.dy
              });
              self.relations.forEach((value) => {
                value.update();
              });
            }
          })
          .on("dragend", function () {
            self.board.update();
          })
      );
  }
}

export class DataSourceNode extends DrawboardElement {

  constructor(nodeType: DataSourceNodeType,
              flowID: number,
              board: DrawboardComponent,
              position: {x: number, y: number}) {
    super(board, position, flowID, nodeType);
  }

  render() {
    if (!this.rendered) {
      this.groupContainer.append("rect")
        .attr("rx", ELEMENT_ROUND_X)
        .attr("ry", ELEMENT_ROUND_Y)
        .attr("height", ELEMENT_HEIGHT)
        .attr("width", ELEMENT_WIDTH)
        .classed("data-source", true);
      this.groupContainer
        .append("text")
        .attr("text-anchor", "middle")
        .attr("dy", ELEMENT_HEIGHT / 2)
        .attr("dx", ELEMENT_WIDTH / 2)
        .append("tspan")
        .html(this.attributes.label);
    }
    this.rendered = true;
  }

}

export type WorkflowNode = ProcessNode|DataSourceNode