import * as d3 from "d3";
import * as _ from "lodash";
import {DrawboardComponent} from "../drawboard.component";
import {Relation} from "./relation";
import {Processor} from "../../../share/data-types";
import {mydebug} from "../../../share/my-log";
import {BasicDrawboardNode, ELEMENT_WIDTH, ELEMENT_HEIGHT} from "./node-basic";
import {ParametersType, ProcessorType, InputType, OutputType} from "../../../share/json-types";
import {Contextmenu} from "./contextmenu";

export class ProcessorNode extends BasicDrawboardNode {

  nodetype: Processor;

  constructor(flowID: number,
              board: DrawboardComponent,
              conterPosition: {x: number, y: number},
              nodeType: Processor) {
    super(nodeType.name, flowID, board, conterPosition);
    this.nodetype = _.cloneDeep(nodeType);

    this.debug_location = "ProcessorNode";
  }

  toJSON(): ProcessorType {
    let parameters = {};
    this.nodetype.parameters.forEach((para: ParametersType) => {
      parameters[para.key] = para.value;
    })
    return {
      id: this.nodetype.id,
      flow_id: this.flowID,
      parameters: parameters,
      loc_x: this.cx,
      loc_y: this.cy
    };
  }

  render(): void {
    super.render();
    this.groupContainer.attr("id","node-"+this.flowID)
      .on("click",()=>{this.groupContainer.select("rect").classed("selectedalgorithm",true)});
    this.groupContainer.select("rect")
      .classed("algorithm", true);
    let input_num = this.nodetype.inputs.length;
    let output_num = this.nodetype.outputs.length;
    let count = 0;
    this.nodetype.inputs.forEach(input => {
      count += 1;
      let cx = ELEMENT_WIDTH * count / (1 + input_num);
      input.cx = cx;
      input.cy = 0;
      this.groupContainer.append("circle")
        .attr("cx", cx)
        .attr("r", "4")
        .attr("data-bind", JSON.stringify(input))
        .classed("input", true)
        .style("stroke", "gray")
        .style("fill", "white")
        .style("stroke-width", "1px")
        .on('mouseover', function (d) {
          d3.select(this).style({r: '10'});
        })
        .on('mouseout', function (d) {
          d3.select(this).style({r: '4'});
        })
        .on("mouseup", () => {
          this.portMouseupHandler(input);
        });
    });

    count = 0;
    this.nodetype.outputs.forEach(output => {
      let outputMenu:Contextmenu = new Contextmenu();
      count += 1;
      let cx = ELEMENT_WIDTH * count / (1 + output_num);
      let cy = ELEMENT_HEIGHT;
      output.cx = cx;
      output.cy = cy;
      let circle = this.groupContainer.append("circle");
      circle
        .attr("cx", cx)
        .attr("cy", cy)
        .attr("r", "4")
        .attr("data-bind", JSON.stringify(output))
        .classed("output", true)
        .style("stroke", "gray")
        .style("fill", "#00CACA")
        .style("stroke-width", "1px")
        .on('mouseover', function (d) {
          d3.select(this).style({r: '10'});
        })
        .on('mouseout', function (d) {
          d3.select(this).style({r: '4'});
        })
        .call(
          d3.behavior.drag()
            .on("dragstart", () => {
              console.log("port-dragstart");
              (<d3.DragEvent> d3.event).sourceEvent.stopPropagation();
            })
            .on("drag", () => {
              console.log("port-drag");
              this.portDragHandler(output);
            })
        );
      outputMenu.addItem("可视化", () => {
        console.log("可视化");
        let Param = {
          processor_id: this.nodetype.id,
          flow_id: this.flowID,
          port_id: output.id,
          visualization: this.nodetype.visualization
        };
        this.board.setParam(Param);
        this.board.gotoVisulise();
      });
      outputMenu.addClickMenu(circle);

      this.menu.addItem2({
        key: "Output-" + count, // +output.id
        type: "dir",
        value: [{
          key: "可视化",
          type: "item",
          event: () => {
            console.log("可视化");
            let Param = {
              processor_id: this.nodetype.id,
              flow_id: this.flowID,
              port_id: output.id,
              visualization: this.nodetype.visualization
            };
            this.board.setParam(Param);
            this.board.gotoVisulise();
          }
        }]
      });
    });

    this.groupContainer.append("svg")
      .classed("nodeStatus",true)
      .attr("x", ELEMENT_WIDTH - 30)
      .attr("y", 14)
      .append("image")
      .attr("height",16)
      .attr("width",16)
      .attr("href","../assets/images/icon-none.svg");
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
  }

  portMouseupHandler(input: InputType): void {
    mydebug(this.debug_location, "mouseupHandler", "begin");
    if (this.board.justDragged) {
      mydebug(this.debug_location, "mouseupHandler", "after shift");
      if (this.board.dragFrom != this && this != null && this.board.dragFrom != null) {
        let relation = new Relation(this.board, this.board.dragFrom, this, this.board.dragFromPort, input);
        this.relations.push(relation);
        this.board.dragFrom.relations.push(relation);
        this.board.relations.push(relation);
      }
      this.board.update();
    }

  }

  portDragHandler(output: OutputType): void {
    mydebug(this.debug_location, "portDragHandler", "begin");
    this.board.justDragged = true;
    this.board.dragFrom = this;
    this.board.dragFromPort = output;

    let mouseCoords = d3.mouse(this.board.container.node());
    mydebug(this.debug_location, "dragHandler", "x=" + mouseCoords[0] + " y=" + mouseCoords[1]);
    this.board.dragLine.classed("hidden", false);
    let fromPosition = {x: 0, y: 0};
    let toPosition = {x: 0, y: 0};
    fromPosition.x = this.cx + output.cx;//ELEMENT_WIDTH / 2;
    fromPosition.y = this.cy + output.cy;//ELEMENT_HEIGHT / 2;
    toPosition.x = mouseCoords[0];
    toPosition.y = mouseCoords[1];
    this.board.dragLine.attr('d', 'M' + fromPosition.x + " " + fromPosition.y + 'C' + fromPosition.x + " " + ((fromPosition.y + toPosition.y) / 2 - 2) + ',' + ((fromPosition.x + toPosition.x) / 2 + 2) + " " + (fromPosition.y + toPosition.y) / 2 + ',' + (fromPosition.x + toPosition.x) / 2 + " " + (fromPosition.y + toPosition.y) / 2 + 'S' + toPosition.x + " " + ((fromPosition.y + toPosition.y) / 2 + 2) + ',' + toPosition.x + " " + toPosition.y);
  }

  dragHandler(): void {
    mydebug(this.debug_location, "dragHandler", "begin");
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

  copyElements(): () => void {
    let x = this.cx + 20;
    let y = this.cy + 20;
    let copyElements = _.cloneDeep(this);
    //let copyElements=Object.assign(this);

    return () => {
      copyElements.nodetype = _.cloneDeep(this.nodetype);
      copyElements.name = this.name;
      copyElements.flowID = this.board.flowIDCounter;
      this.board.flowIDCounter += 1;
      copyElements.board = this.board;
      copyElements.cx = x + 20;
      copyElements.cy = y + 20;
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
