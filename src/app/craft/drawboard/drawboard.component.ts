import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { WorkflowNode } from "./internal/node-basic";
import * as d3 from "d3";
import { Relation } from "./internal/relation";
import { WorkflowNodeType, Processor } from "../../share/data-types";
import { CraftService } from "../craft.service";
import { mydebug } from "../../share/my-log";
import { DataService } from "../../data.service";
import {
  SubmitType, Workflow_data_all, reRender_Parameter, reRender_Connections,
  reRender_Nodes, ConnectionType, OutputType, NodeStat, InputType
} from "../../share/json-types";
import { ProcessorNode } from "./internal/node-processor";
import { GlobalService } from "../../global.service";
import { node } from "../../etl/newtask/nodes/node";

@Component({
  selector: 'app-drawboard',
  templateUrl: './drawboard.component.html',
  styleUrls: ['./drawboard.component.sass']
})
export class DrawboardComponent implements OnInit {
  private debug_location: string = "DrawboardComponent";
  private taskName: string;
  //svg相关
  private readonly constants = {
    BACKSPACE_KEY: 8,
    DELETE_KEY: 46,
    ENTER_KEY: 13,
    RESOLUTION_WIDTH: 800,
    RESOLUTION_HEIGHT: 500
  };
  private svg: any;
  container: any;
  relationLayer: any;
  dragLine: any;

  workflowNodes: WorkflowNode[];
  relations: Relation[];

  private selectedRelation: Relation;
  private selectedNodeType: WorkflowNodeType;
  private selectedNode: WorkflowNode;

  //state相关
  private isReload: boolean;//todo:用于从历史重绘，使用globalService获取
  justDragged: boolean;
  private lastKeyDown: number;
  dragFrom: WorkflowNode;
  dragFromPort: OutputType;
  shiftDrag: boolean;
  flowIDCounter: number;
  private workflow_id: number;
  private visualise_func: () => void;
  private log_func: () => void;
  private interval;

  private inter;
  private startTime;
  private timerRunner;
  private showTime = false;
  constructor(private craftService: CraftService,
              private globalService: GlobalService,
              private dataService: DataService) {
    this.globalService.setNodesttatHook(() => {
      this.workflowNodes.forEach(node => {
        node.groupContainer.select(".nodeStatus").select("image").attr("href", "assets/images/icon-notstarted.svg");
      });
      this.interval = setInterval(() => {
        this.getNodeStat()
      }, 1000);//5s一次
    });
    this.craftService.drawboard = this;
    this.craftService.bookSelectedNodeType((nodeType: WorkflowNodeType) => {
      this.selectedNodeType = nodeType;
      mydebug(this.debug_location, "craftService.bookSelectedNodeType", "isNull? " + String(this.selectedNodeType == null));
    });

    this.craftService.bookSelectedNode((node: WorkflowNode) => {
      this.selectedNode = node;
      mydebug(this.debug_location, "craftService.bookSelectedNode", "isNull? " + String(this.selectedNode == null));
    });
    this.craftService.bookSelectedRelation((relation: Relation) => {
      this.selectedRelation = relation;
      mydebug(this.debug_location, "craftService.bookSelectedRelation", "isNull? " + String(this.selectedRelation == null));
    });
    this.craftService.bookTaskName((taskName: string) => {
      this.taskName = taskName;
    });
    this.workflowNodes = [];
    this.relations = [];

    //设置用于submit的钩子函数
    this.craftService.setSubmitHook(() => {
      return this.getSubmitPara();
    });

    this.globalService.book_workflowID((id: number) => {
      this.workflow_id = id;
    });
    //设置用于reRender的钩子函数
    this.craftService.setReRenderHook(() => {
      this.dataService.getDataByFlowID(this.workflow_id).then(
        response => {
          console.log("----------------reRender------------------");
          let reRenderData: Workflow_data_all = response;
          this.reRender(reRenderData);
        }
      );
    });

    this.globalService.bookRuuning((bool: boolean)=>{
      if(bool){
        this.startTime = Date.now();
        this.showTime = true;
        this.inter = setInterval(()=>{
          this.timerRunner = Date.now() - this.startTime - 8*3600000;
        }, 50)
      }else {
        if(this.showTime){
          clearInterval(this.inter);
          let time = document.getElementById("time");
          alert("分析成功，消耗时间" + time.innerHTML)
        }
      }
    });
  }

  ngOnInit() {
    this.initState();
    this.initSVG();
    this.bindEventHandler();
  }

  private initState() {
    //选择初始化为null
    this.craftService.setSelectedNode(null);
    this.craftService.setSelectedRelation(null);

    this.flowIDCounter = 0;
    this.justDragged = false;
    this.lastKeyDown = -1;
    this.dragFrom = null;
    this.dragFromPort = null;
    this.shiftDrag = false;
  }

  private initSVG() {
    this.svg = d3.select("svg#drawboard");
    this.container = this.svg.append("g");    //绑定绘图区
    this.relationLayer = this.container.append("g");  //绑定关系连线区

    this.dragLine = this.container.append('svg:path')
      .attr('class', 'hidden path')
      .attr('fill', 'transparent')
      .attr('d', 'M0,0 L0,0')
      .style("stroke-dasharray", "10 2")
      .style('marker-end', 'url(#mark-end-arrow)');

    this.svg
      .classed("drawboard", true);
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

  count = 0;
  //todo：如要需要，在此添加键盘事件
  private keyDown(): void {
    this.lastKeyDown = d3.event['keyCode'];
    mydebug(this.debug_location, "KeyDown", String(this.lastKeyDown));
    // 模板
    switch (d3.event['keyCode']) {
      case this.constants.DELETE_KEY:
        console.log(this.relations);
        console.log(this.workflowNodes);
        console.log(this.getSubmitPara());
        (<Event> d3.event).preventDefault();
        break;
      case this.constants.ENTER_KEY:
        this.setNodestat([{processor_id: 28, status: this.count, flow_id: 0}]);
        this.count = (this.count++) % 4;
        console.log(this.count);
        break;
    }
  }

  private keyUp(): void {
    this.lastKeyDown = -1;
  }

  private mouseDownHandler(): void {
    mydebug(this.debug_location, "mouseDownHandler", 'begin');
    // mydebug(this.debug_location, "mouseDownHandler", this.selectedNodeType ? this.selectedNodeType.name : 'null');
    // if (this.selectedNodeType != null) {
    //   let cord = d3.mouse(this.container.node());
    //   let position = {'x': cord[0], 'y': cord[1]};
    //
    //   //好像是工厂模式，根据输入不同返回不同的构造方法
    //   let fn = (): WorkflowNode => {
    //     //todo:若新加Node类型，在此进行类型判断
    //     return new ProcessorNode(this.flowIDCounter, this, position, <Processor>this.selectedNodeType);
    //
    //   }
    //
    //   let newNode = fn();
    //
    //   this.flowIDCounter += 1;
    //   this.workflowNodes.push(newNode);
    //   mydebug(this.debug_location, "mouseDownHandler", "befroe render");
    //   newNode.render();
    //   mydebug(this.debug_location, "mouseDownHandler", "after render");
    //   this.craftService.setSelectedNodeType(null);
    //   this.craftService.setSelectedNode(newNode);
    // } else {
    // this.craftService.setSelectedNode(null);
    this.container.selectAll("rect").classed("selectedalgorithm", false);
    // }
  }

  private mouseupHandler(): void {
    mydebug(this.debug_location, "mouseupHandler", 'begin');
    this.update();
  }

  private zoomHandler(): void {
    mydebug(this.debug_location, "zoomHandler", 'begin');
    // if ((<d3.ZoomEvent> d3.event).scale < 1) {
    //   this.container.attr(
    //     "transform",
    //     "translate(" + (<d3.ZoomEvent> d3.event).translate + ") scale(1)");
    // } else if ((<d3.ZoomEvent> d3.event).scale > 5) {
    //   this.container.attr(
    //     "transform",
    //     "translate(" + (<d3.ZoomEvent> d3.event).translate + ") scale(5)");
    // } else {
    //   this.container.attr(
    //     "transform",
    //     "translate(" + (<d3.ZoomEvent> d3.event).translate + ") scale(" + (<d3.ZoomEvent> d3.event).scale + ")");
    // }
  }

  private zoomstartHandler(): void {
    mydebug(this.debug_location, "zoomstartHandler", 'begin');
    d3.select('body').style("cursor", "move");
  }

  private zoomendHandler(): void {
    mydebug(this.debug_location, "zoomendHandler", 'begin');
    d3.select('body').style("cursor", "auto");
  }

  private dragHandler(): void {
    mydebug(this.debug_location, "dragHandler", 'begin');
    this.justDragged = true;
    this.container.x += (<d3.DragEvent> d3.event).dx;
    this.container.y += (<d3.DragEvent> d3.event).dy;
    mydebug(this.debug_location, "dragHandler", 'x, y: ' + this.container.x + ' ' + this.container.y);
  }

  private dragstartHandler(): void {
    mydebug(this.debug_location, "dragstartHandler", 'begin');
  }

  private dragendHandler(): void {
    mydebug(this.debug_location, "dragendHandler", 'begin');
  }

  update() {
    this.justDragged = false;
    this.dragLine.attr("d", "M0,0L0,0").classed("hidden", true);
    this.shiftDrag = false;
    this.dragFrom = null;
    this.dragFromPort = null;
  }

  setSelectedRelation(relation: Relation): void {
    this.craftService.setSelectedRelation(relation);
  }

  setSelectedNode(node: WorkflowNode) {
    this.craftService.setSelectedNode(node);
  }

  setTaskName(name: string) {
    this.craftService.setTaskName(name);
  }

  getSubmitPara(): string {
    mydebug(this.debug_location, "getSubmitPara-taskName", this.taskName);

    let paths: ConnectionType[] = [];
    this.relations.map((relation) => {
      let path: ConnectionType = {
        from: {
          flow_id: relation.from.flowID,
          processor_id: relation.from.nodetype.id,
          id: relation.from_port.id
        },
        to: {
          flow_id: relation.to.flowID,
          processor_id: relation.to.nodetype.id,
          id: relation.to_port.id
        }
      };
      paths.push(path);
    });
    let submitType: SubmitType = {
      name: this.taskName,
      processors: this.workflowNodes.map(node => {
        return node.toJSON();
      }),
      connections: paths
    };

    return JSON.stringify(submitType);
  }

  reRender(reRenderData: Workflow_data_all): void {
    mydebug(this.debug_location, "reRender", "begin");
    console.log(reRenderData);
    let processorNodes: ProcessorNode[] = reRenderData.processors.map(
      (data: reRender_Nodes) => {
        console.log("--------one node begin----");
        console.log(data);
        let processor_id = data.id;
        let nodeType = this.dataService.spark_data.filter(item => item.id == processor_id)[0];
        let processor = new Processor(nodeType);
        let node = new ProcessorNode(+data.flow_id, this, {x: data.loc_x, y: data.loc_y}, processor);
        console.log(node);
        this.workflowNodes.push(node);
        node.render();
        console.log("--------one node over----");
        return node;
      }
    );
    console.log("-------------spark_data Over-------------------");
    reRenderData.parameters.forEach((item: reRender_Parameter) => {
      console.log(item);
      let node = this.workflowNodes.filter(i => i.flowID == item.flow_id)[0];
      console.log(node);
      if (node != null){
        // let param = node.nodetype.parameters.filter(s => s.label == item.label)[0];
        // console.log(param);
        // if (param!=null)
        //   param.value = item.val;

        //todo: reRender Param
        // node.nodetype.reRender_param.push(item.);
      }
    });

    let paths: reRender_Connections[] = reRenderData.connections;
    console.log("-------------rerender connections-------------------");
    console.log(paths);
    for (let path of paths) {
      let from = path.output_processor_flow_id;
      let to = path.input_processor_flow_id;
      console.log("from: " + from + "\nto: " + to);
      let fromNode = this.findNodeByFlowID(+from);
      let toNode = this.findNodeByFlowID(+to);
      let relation = new Relation(this, fromNode, toNode, this.findOutputById(path.output.id, fromNode), this.findInputById(path.input.id, toNode));
      fromNode.relations.push(relation);
      toNode.relations.push(relation);
      this.relations.push(relation);
    }
  }

  findNodeByFlowID(flowid: number): WorkflowNode {
    let node: WorkflowNode;
    node = this.workflowNodes.filter(node => {
      return node.flowID == flowid;
    })[0];
    return node;
  }

  findInputById(id: number, node: WorkflowNode): InputType {
    return node.nodetype.inputs.filter(item => item.id == id)[0];
  }

  findOutputById(id: number, node: WorkflowNode): OutputType {
    return node.nodetype.outputs.filter(item => item.id == id)[0];
  }

  setParam(Param: { processor_id: number; flow_id: number; port_id?: number, visualization: boolean, option: string}) {
    this.globalService.processor_id = Param.processor_id;
    this.globalService.flow_id = Param.flow_id;
    this.globalService.port_id = Param.port_id;
    this.globalService.visualization = Param.visualization;
    this.globalService.visualization_option = Param.option;
  }

  setVisualise(visualise_func: () => void) {
    this.visualise_func = visualise_func;
  }

  gotoVisulise() {
    this.visualise_func();
  }

  setLog(log_func: () => void) {
    this.log_func = log_func;
  }

  gotoLog() {
    this.log_func();
  }
  getNodeStat() {
    if(!this.globalService.getRunning())
      this.globalService.setRuuning(true);
    this.craftService.getNodeStat().then(res => {
      console.log("------------------getNodeStat-------------------------");
      console.log(res);
      console.log(res.length);
      let over = true;
      let error = false;
      res.forEach(item => {
        if (item.status == 2)
          error = true;
        else if (item.status != 3)
          over = false;
      });
      console.log(over);
      console.log(error);
      if ((over && res.length === this.workflowNodes.length) || error) {
        console.log("------------------getNodeStat2-------------------------");
        this.globalService.setRuuning(false);
        clearInterval(this.interval);
      }
      this.setNodestat(res);
    });
  }

  setNodestat(stat: NodeStat[]) {
    stat.forEach(item => {
      let temp = d3.select("#node-" + item.flow_id).select(".nodeStatus").select("image");
      console.log(temp.node());
      switch (item.status) {
        case 0:
          temp.attr("href", "assets/images/icon-notstarted.svg");
          break;
        case 1:
          temp.attr("href", "assets/images/Processing.gif");
          break;
        case 2:
          temp.attr("href", "assets/images/icon-error.png");
          break;
        case 3:
          temp.attr("href", "assets/images/icon-complete.svg");
          break;

      }
    });
  }
}
