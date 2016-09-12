import {Component, OnInit, Input} from "@angular/core";
import {DrawboardStatusService} from "../drawboard-status.service";
import {ParametersStatusService} from "../parameters-status.service";
import {SubmitService} from "../submit.service";
import {ProcessNode, DataSourceNode, WorkflowNode} from "./internal/drawboard.node";
import {DataSourceNodeType, ProcessNodeType} from "./internal/drawboard.node-types";
import {ResultService} from "../result.service";

@Component({
  moduleId: module.id,
  selector: 'app-drawboard',
  templateUrl: 'drawboard.component.html',
  styleUrls: ['drawboard.component.css']
})
export class DrawboardComponent implements OnInit {
  nodes: WorkflowNode[] = [];
  svg: any; //页面svg对象
  def: any;
  container: any;
  relationLayer: any;
  dragLine: any;

  selectedLine: any;
  selectedNode: any;
  mouseDownNode: any;

  justDragged: boolean;
  dragFrom: any;
  scale: boolean;
  lastKeyDown: number;
  shiftDrag: boolean;
  flowIDCounter = 0;

  constants = {
    BACKSPACE_KEY: 8,
    DELETE_KEY: 46,
    ENTER_KEY: 13,
    RESOLUTION_WIDTH: 800,
    RESOLUTION_HEIGHT: 600
  };

  @Input()
  type: number;

  /**
   * @experimental
   */
  isValidWorkflow(): boolean {
    return true;
  }

  getWorkflowJSON(): string {
    let paths: string[] = [];
    this.nodes.map((nodeElement)=> {
      nodeElement.relations.map((relation)=> {
        let path = relation.from.attributes.flowID + "->" + relation.to.attributes.flowID;
        if (paths.indexOf(path) == -1) {
          paths.push(path);
        }
      });
    });

    return JSON.stringify(
      {
        sources: this.nodes.filter((node): boolean=> {
          return (node instanceof DataSourceNode)
        }).map((node): {}=> {
          return node.toJSON()
        }),
        processes: this.nodes.filter((node): boolean=> {
          return (node instanceof ProcessNode)
        }).map((node): {}=> {
          return node.toJSON()
        }),
        paths: paths
      }
    );
  }

  private initState() {
    this.selectedLine = null;
    this.selectedNode = null;
    this.mouseDownNode = null;
    this.justDragged = false;
    this.dragFrom = null;
    this.scale = false;
    this.lastKeyDown = -1;
    this.shiftDrag = false;

    this.svg = d3.select("svg#drawboard");    //绑定svg
    this.def = this.svg.append("svg:def");    //绑定样式区
    this.container = this.svg.append("g");    //绑定绘图区
    this.relationLayer = this.container.append("g");  //绑定关系连线区
  }

  private initSVG() {
    let self = this;
    this.dragLine = this.container.append('svg:path')
      .attr('class', 'hidden path')
      .attr('d', 'M0,0 L0,0')
      .style('marker-end', 'url(/craft#mark-end-arrow)');

    this.svg
      .attr("viewBox", `0 0 ${this.constants.RESOLUTION_WIDTH} ${this.constants.RESOLUTION_HEIGHT}`)
      .classed("drawboard", true);
  }

  private keyDown() {
    if (this.lastKeyDown !== -1) return;
    this.lastKeyDown = d3.event['keyCode'];
    // switch (d3.event['keyCode']) {
    //   case this.constants.DELETE_KEY:
    //     (<Event> d3.event).preventDefault();
    //     break;
    //   case this.constants.BACKSPACE_KEY:
    //     (<Event> d3.event).preventDefault();
    //     break;
    // }
  }

  private keyUp() {
    this.lastKeyDown = -1;
  }

  private bindEventHandler() {
    let self = this;

    //注册键盘事件监听
    d3.select(window)
      .on("keydown", function () {
        self.keyDown();
      })
      .on("keyup", function () {
        self.keyUp();
      });

    self.svg.on("mousedown", function () {
      let selectedNodeType = self.drawBoardStatus.getSelectedNodeType();
      if (selectedNodeType != null) {
        let cord = d3.mouse(self.container.node());
        let position = {'x': cord[0], 'y': cord[1]};

        let fn = (): WorkflowNode=> {
          if (selectedNodeType instanceof ProcessNodeType) {
            return new ProcessNode(<ProcessNodeType>selectedNodeType, self.flowIDCounter, self, position);
          } else {
            // if (selectedNodeType instanceof DataSourceNodeType) {
            return new DataSourceNode(<DataSourceNodeType>selectedNodeType, self.flowIDCounter, self, position);
          }
        };

        let newElement = fn();

        self.flowIDCounter += 1;
        self.nodes.push(newElement);
        console.log("before render");
        newElement.render();
        console.log("end render");
      } else {
        self.setParameter(null);
        self.setResult(null);
      }

      self.drawBoardStatus.cancelSelectedNodeType();
    });

    self.svg.call(d3.behavior.zoom()
      .on("zoom", function () {
        self.container.attr(
          "transform",
          "translate(" + (<d3.ZoomEvent> d3.event).translate + ") scale(" + (<d3.ZoomEvent> d3.event).scale + ")");
        return true;
      })
      .on("zoomstart", function () {
        d3.select('body').style("cursor", "move");
      })
      .on("zoomend", function () {
        d3.select('body').style("cursor", "auto");
      })
    );

    //注册绘图区鼠标拖拽事件处理
    self.container.call(d3.behavior.drag()
      .on("drag", function () {
        self.justDragged = true;
        self.container.x += (<d3.DragEvent> d3.event).dx;
        self.container.y += (<d3.DragEvent> d3.event).dy;
      })
    );
  }


  setParameter(node) {
    this.parametersStatus.setSelectedNode(node);
  }
  setResult(node: ProcessNode) {
    this.resultsService.setSelectedNode(node);
  }
  constructor(private drawBoardStatus: DrawboardStatusService,
              private parametersStatus: ParametersStatusService,
              private resultsService: ResultService,
              private submitService: SubmitService) {
    this.drawBoardStatus.setSubmitClickHook(this.getSubmitHandler());
  }

  public update() {
    this.justDragged = false;
    this.dragLine.attr("d", "M0,0L0,0").classed("hidden", true);
    this.shiftDrag = false;
    this.dragFrom = null;
  }

  ngOnInit() {
    let self = this;

    self.initState();
    self.initSVG();    //初始化svg渲染和箭头图标等
    self.bindEventHandler();
  }

  getSubmitHandler(): (()=>void) {
    let self = this;
    this.type = this.drawBoardStatus.getType();
    console.log(this.type);
    if(this.type==1)
      return()=> {
        self.submitService.submit4map(self.getWorkflowJSON());
      };
    return ()=> {
      self.submitService.submit(self.getWorkflowJSON());
    }
  }

}
