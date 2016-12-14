import { Component, OnInit } from '@angular/core';
import * as d3 from "d3";
import {DatabaseNodeType, SqlDatabase, NosqlDatabase} from '../share/node-types';
import { DatabaseNode } from './internal/node';
import { Relation } from './internal/relation';
import { Contextmenu } from './internal/context_menu';
import { DataInteractionService } from '../data-interaction.service';

@Component({
  selector: 'etl-drawboard',
  templateUrl: './drawboard.component.html',
  styleUrls: ['./drawboard.component.sass']
})

export class DrawboardComponent implements OnInit {
  //定义属性
  private readonly constants = {
    BACKSPACE_KEY: 8,
    DELETE_KEY: 46,
    ENTER_KEY: 13,
    RESOLUTION_WIDTH: 600,//画板宽度
    RESOLUTION_HEIGHT: 450//画板高度
  };

  private teskName: string;
  
  //svg相关
  private svg: any;
  container: any;
  relationLayer: any;
  dragLine: any;
  scale: boolean;

  workflowNodes: DatabaseNode[];//记录当前面板上的所有节点,根据其nodetype属性的type类型判定为sql or nosql
  relations: Relation[];//记录当前面板上的连线

  private selectedRelation: Relation;
  private selectedNodeType: DatabaseNodeType;
  private selectedNode: DatabaseNode;
  private taskName: string;

  //state相关
  private isReload: boolean;//todo:用于从历史重绘，使用globalService获取
  justDragged: boolean;
  private lastKeyDown: number;
  dragFrom: DatabaseNode;
  shiftDrag: boolean;//按下shift键拖拽 => 连线
  private flowIDCounter: number;//计数器,生成flowId

  constructor(private DataInteractionService: DataInteractionService) {
    this.DataInteractionService.bookSelectedNodeType((nodeType: DatabaseNodeType) => {
      this.selectedNodeType = nodeType;
      // mydebug(this.debug_location, "DataInteractionService.bookSelectedNodeType", String(this.selectedNodeType == null));
    });

    this.DataInteractionService.bookSelectedNode((node: DatabaseNode) => {
      this.selectedNode = node;
      // mydebug(this.debug_location, "DataInteractionService.bookSelectedNode", String(this.selectedNode == null));
    });
    this.DataInteractionService.bookSelectedRelation((relation: Relation) => {
      this.selectedRelation = relation;
      // mydebug(this.debug_location, "DataInteractionService.bookSelectedRelation", String(this.selectedRelation == null));
    });
    this.DataInteractionService.bookTaskName((taskName:string)=>{
      this.teskName  = taskName;
    });
    this.workflowNodes = [];
    this.relations = [];
    // this.DataInteractionService.setTaskName("新建任务");
  }

  private initState() {
    //选择初始化为null
    this.DataInteractionService.setSelectedNode(null);
    this.DataInteractionService.setSelectedRelation(null);

    this.flowIDCounter = 0;
    this.justDragged = false;
    this.lastKeyDown = -1;
    this.dragFrom = null;
    this.shiftDrag = false;
  }

  private initSVG() {
    this.svg = d3.select("svg#drawboard");
    this.container = this.svg.append("g");    //绑定绘图区
    this.relationLayer = this.container.append("g");  //绑定关系连线区

    this.dragLine = this.container.append('svg:path')
      .attr('class', 'hidden path')
      .attr('d', 'M0,0 L0,0')
      .style('marker-end', 'url(/etl/newtask#mark-end-arrow)');

    this.svg
      .attr("viewBox", `0 0 ${this.constants.RESOLUTION_WIDTH} ${this.constants.RESOLUTION_HEIGHT}`)
      .classed("drawboard", true);
  }

  submit(): void{
    this.DataInteractionService.setWorflowNodes(this.workflowNodes);
    this.DataInteractionService.setRelations(this.relations);
    this.DataInteractionService.setTaskName(this.taskName);
 
  }

  ngOnInit() {
    this.initState();
    this.initSVG();
    this.bindEventHandler();
  }

  private bindEventHandler(): void {
    let self = this;

    //注册键盘事件监听
    d3.select(window)
      .on("keydown", () => {
        self.keyDown();
      })
      .on("keyup", function () {
        self.keyUp();
      });

    this.svg.on("mousedown", () => {
      console.log("drawboard-mousedwon");
      self.mouseDownHandler();
    })
      .on("mouseup", () => {
        console.log("drawboard-mouseup");
        self.mouseupHandler();
      });

    this.svg.call(
      d3.behavior.zoom().on("zoom", () => {
        self.zoomHandler();
      })
        .on("zoomstart", () => {
          self.zoomstartHandler();
        })
        .on("zoomend", () => {
          self.zoomendHandler();
        })
    );

    this.container.call(
      d3.behavior.drag().on("drag", () => {
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

  //todo：如要需要，在此添加键盘事件
  private keyDown(): void {
    this.lastKeyDown = d3.event['keyCode'];
    // mydebug(this.debug_location, "KeyDown", String(this.lastKeyDown));
    // 模板
    switch (d3.event['keyCode']) {
      case this.constants.DELETE_KEY:
        console.log(this.relations);
        console.log(this.workflowNodes);
        (<Event> d3.event).preventDefault();
        break;
    }
  }

  private keyUp(): void {
    this.lastKeyDown = -1;
  }

  private mouseDownHandler(): void {
    // mydebug(this.debug_location, "mouseDownHandler", 'begin');
    // mydebug(this.debug_location, "mouseDownHandler", this.selectedNodeType ? this.selectedNodeType.name : 'null');
    if (this.selectedNodeType != null) {
      let cord = d3.mouse(this.container.node());
      let position = {'x': cord[0], 'y': cord[1]};

      //好像是工厂模式，根据输入不同返回不同的构造方法
      let fn = (): DatabaseNode => {
        // if (this.selectedNodeType instanceof SqlDatabase) {
        //   return new AlgorithmNode(this.flowIDCounter, this, position, this.selectedNodeType)
        // } else if (this.selectedNodeType instanceof Dataset) {
        //   return new DatasetNode(this.flowIDCounter, this, position, this.selectedNodeType)
        // }
        return new DatabaseNode(this.flowIDCounter, this, position, this.selectedNodeType)
      }

      let newNode = fn();

      this.flowIDCounter += 1;
      this.workflowNodes.push(newNode);
      // mydebug(this.debug_location, "mouseDownHandler", "befroe render");
      newNode.render();
      // mydebug(this.debug_location, "mouseDownHandler", "after render");
      this.DataInteractionService.setSelectedNodeType(null);
      this.DataInteractionService.setSelectedNode(newNode);
    } else {
      this.DataInteractionService.setSelectedNode(null);
    }
  }

  private mouseupHandler(): void {
    // mydebug(this.debug_location, "mouseupHandler", 'begin');
  }

  private zoomHandler(): void {
    // mydebug(this.debug_location, "zoomHandler", 'begin');
    if ((<d3.ZoomEvent> d3.event).scale < 1) {
      this.container.attr(
        "transform",
        "translate(" + (<d3.ZoomEvent> d3.event).translate + ") scale(1)");
    } else {
      this.container.attr(
        "transform",
        "translate(" + (<d3.ZoomEvent> d3.event).translate + ") scale(" + (<d3.ZoomEvent> d3.event).scale + ")");
    }
  }

  private zoomstartHandler(): void {
    // mydebug(this.debug_location, "zoomstartHandler", 'begin');
    d3.select('body').style("cursor", "move");
  }

  private zoomendHandler(): void {
    // mydebug(this.debug_location, "zoomendHandler", 'begin');
    d3.select('body').style("cursor", "auto");
  }

  private dragHandler(): void {
    // mydebug(this.debug_location, "dragHandler", 'begin');
    this.justDragged = true;
    this.container.x += (<d3.DragEvent> d3.event).dx;
    this.container.y += (<d3.DragEvent> d3.event).dy;
    // mydebug(this.debug_location, "dragHandler", 'x, y: ' + this.container.x + ' ' + this.container.y);
  }

  private dragstartHandler(): void {
    // mydebug(this.debug_location, "dragstartHandler", 'begin');
  }

  private dragendHandler(): void {
    // mydebug(this.debug_location, "dragendHandler", 'begin');
  }

  update() {
    this.justDragged = false;
    this.dragLine.attr("d", "M0,0L0,0").classed("hidden", true);
    this.shiftDrag = false;
    this.dragFrom = null;
  }

  setSelectedRelation(relation: Relation): void {
    this.DataInteractionService.setSelectedRelation(relation);
  }

  setSelectedNode(node: DatabaseNode) {
    this.DataInteractionService.setSelectedNode(node);
  }
}
