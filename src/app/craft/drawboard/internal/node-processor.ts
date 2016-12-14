import * as d3 from "d3";
import * as _ from "lodash";
import {DrawboardComponent} from "../drawboard.component";
import {Relation} from "./relation";
import {Processor} from "../../../share/data-types";
import {mydebug} from "../../../share/my-log";
import {BasicDrawboardNode, ELEMENT_WIDTH, ELEMENT_HEIGHT} from "./node-basic";
import {ParametersType} from "../../../share/json-types";

export class ProcessorNode extends BasicDrawboardNode {

  nodetype: Processor;

  constructor(flowID: number,
              board: DrawboardComponent,
              conterPosition: {x: number, y: number},
              nodeType: Processor) {
    super(nodeType.name, flowID, board, conterPosition);
    this.nodetype = nodeType;

    this.debug_location = "ProcessorNode";
  }

  toJSON(): {} {
    let parameters = {};
    this.nodetype.parameters.forEach((para:ParametersType)=>{
      parameters[para.key]=para.value;
    })
    return {
      id: "" + this.nodetype.id,
      flow_id: "" + this.flowID,
      parameters: parameters,
      loc_x: "" + this.cx,
      loc_y: "" + this.cy
    };
  }

  render(): void {
    super.render();
    this.groupContainer.select("rect")
      .classed("algorithm", true);
    this.groupContainer.append("circle")
      .attr("cx",ELEMENT_WIDTH / 2)
      // .attr("cy",this.cy)
      .attr("r","4")
      .style("stroke","gray")
      .style("fill","white")
      .style("stroke-width","1px");
    this.groupContainer.append("circle")
      .attr("cx",ELEMENT_WIDTH / 2)
      .attr("cy",ELEMENT_HEIGHT)
      .attr("r","4")
      .style("stroke","gray")
      .style("fill","#00CACA")
      .style("stroke-width","1px");
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

  copyElements(): ()=>void {
    let x = this.cx + 20;
    let y = this.cy + 20;
    let copyElements = _.cloneDeep(this);
    //let copyElements=Object.assign(this);

    return () => {
      copyElements.nodetype = this.nodetype;
      copyElements.name = this.name;
      copyElements.flowID = this.board.flowIDCounter;
      this.board.flowIDCounter += 1;
      copyElements.board = this.board;
      copyElements.cx = x;
      copyElements.cy = y;
      copyElements.groupContainer = copyElements.board.container.append("g");
      copyElements.setCenterPosition({'x': x, 'y': y});
      copyElements.relations = [];
      copyElements.initMenu();
      copyElements.bindEventHandler();
      this.board.workflowNodes.push(copyElements);
      copyElements.render();
    }
  }
}
