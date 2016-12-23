import {Component, OnInit, Input, AfterViewInit} from '@angular/core';
import {WorkflowNodeType} from "../../../share/data-types";
import {CraftService} from "../../craft.service";
import {ProcessorNode} from "../../drawboard/internal/node-processor";
import {ELEMENT_WIDTH} from "../../drawboard/internal/node-basic";
import {ELEMENT_HEIGHT} from "../../../etl/newtask/drawboard/internal/node";
import * as d3 from "d3";
import {mydebug} from "../../../share/my-log";

@Component({
  selector: 'app-template-item',
  templateUrl: './template-item.component.html',
  styleUrls: ['./template-item.component.sass']
})
export class TemplateItemComponent implements OnInit, AfterViewInit {
  @Input() data;
  private selectedNodeType: WorkflowNodeType;
  private debug_location:string = "TemplateItemComponent";
  private drawboard;
  private node;

  constructor(private craftService: CraftService) {
    //通过订阅者模式保证本地与CraftService中的selectedNodeType的一致
    this.craftService.bookSelectedNodeType((nodeType: WorkflowNodeType) => {
      this.selectedNodeType = nodeType;
    });
  }

  ngOnInit() {
  }
  ngAfterViewInit(): void {
    let self = this;
    this.drawboard = this.craftService.drawboard;
      // console.log(d3.select("#processor-"+this.data.id).node());
      d3.select("#processor-"+this.data.id).call(
        d3.behavior.drag()
          .on("drag", () => {
            self.dragHandler();
          })
          .on("dragstart", () => {
            self.dragstartHandler();
          })
          .on("dragend", () => {
            self.dragendHandler();
          })
      );
  }
  private dragHandler() {
    let dragEvent = <d3.DragEvent> d3.event;
    this.node.setCenterPosition({
      'x': this.node.cx + dragEvent.dx,
      'y': this.node.cy + dragEvent.dy
    });
  }

  private dragstartHandler() {
    console.log("----------------drag start--------------");

    let selectedNode = this.data;
    let gElement = this.drawboard.container.node();
    if (selectedNode != null) {
      let coord = d3.mouse(gElement);
      let loc_x = coord[0]-ELEMENT_WIDTH/2;
      let loc_y = coord[1]-ELEMENT_HEIGHT/2;
      // console.log(loc_x + "------"+loc_y);
      this.node = new ProcessorNode(this.drawboard.flowIDCounter,this.drawboard, {
        'x': loc_x,
        'y': loc_y
      }, selectedNode);
      this.drawboard.flowIDCounter += 1;
      this.drawboard.workflowNodes.push(this.node);
      this.node.render();
      this.craftService.setSelectedNodeType(null);
      this.craftService.setSelectedNode(this.node);
    }
  }

  private dragendHandler() {
    console.log("----------------drag end--------------");
    let svgH = this.drawboard.svg.node().height.baseVal.value;
    let svgD = this.drawboard.svg.node().width.baseVal.value;
    if(this.node.cx>0 && this.node.cx < svgD && this.node.cy > 0 && this.node.cy < svgH){
      return
    }else{
      (this.node.deleteNode())();
    }
  }
  itemClicked(item: WorkflowNodeType) {
    if (this.selectedNodeType == item) {
      this.craftService.setSelectedNodeType(null);
    } else {
      this.craftService.setSelectedNodeType(item);
    }
    mydebug(this.debug_location, "itemClicked", this.selectedNodeType ? '' + this.selectedNodeType.id : 'null');
  }
}
