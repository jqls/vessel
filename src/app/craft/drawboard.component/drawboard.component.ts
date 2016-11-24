import {Component, OnInit, Input} from "@angular/core";
import {DrawboardStatusService} from "../drawboard-status.service";
import {ParametersStatusService} from "../parameters-status.service";
import {SubmitService} from "../submit.service";
import {ProcessNode, DataSourceNode, WorkflowNode, StormNode} from "./internal/drawboard.node";
import {
    DataSourceNodeType, ProcessNodeType, StormNodeType,
    DataSourceNodeTypeJSON, ProcessNodeTypeJSON
} from "./internal/drawboard.node-types";
import {ResultService} from "../result.service";
import * as d3 from "d3";
import {GlobalService} from "../../global.service";
import {ProcessService} from "../process.service";
import {SubmitJson} from "../data-type";
import {Relation} from "./internal/drawboard.relation";


@Component({
    // moduleId: module.id,
    selector: 'app-drawboard',
    templateUrl: 'drawboard.component.html',
    styleUrls: ['drawboard.component.css']
})
export class DrawboardComponent implements OnInit {
    @Input() isReload: boolean;
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
        RESOLUTION_HEIGHT: 500
    };

    @Input()
    type: number;

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
        console.log(this.drawBoardStatus.getTaskName());
        return JSON.stringify(
            {
                taskName: this.drawBoardStatus.getTaskName(),
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
           .attr('d', 'M0,0L0,0')
            .style('marker-end', 'url(/craft#mark-end-arrow)').style("stroke","lightgray").style( "stroke-dasharray","10 2").attr("fill","none");

        this.svg
            .attr("viewBox", `0 0 ${this.constants.RESOLUTION_WIDTH} ${this.constants.RESOLUTION_HEIGHT}`)
            .classed("drawboard", true);
    }

    private keyDown() {
        if (this.lastKeyDown !== -1) return;
        this.lastKeyDown = d3.event['keyCode'];
        //todo: 添加键盘事件
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
                    } else if (selectedNodeType instanceof DataSourceNodeType) {
                        return new DataSourceNode(<DataSourceNodeType>selectedNodeType, self.flowIDCounter, self, position);
                    } else if (selectedNodeType instanceof StormNodeType) {
                        return new StormNode(<StormNodeType>selectedNodeType, self.flowIDCounter, self, position);
                    }
                };

                let newElement = fn();

                self.flowIDCounter += 1;
                self.nodes.push(newElement);
                console.log("before render");
                newElement.render();
                console.log("end render");
            } else {
                // console.log("set null");
                self.setParameter(null);
                // self.setResult(null);
            }

            self.drawBoardStatus.cancelSelectedNodeType();
        });

        self.svg.call(d3.behavior.zoom()
            .on("zoom", function () {
                self.container.attr(
                    "transform",
                    "translate(" + (<d3.ZoomEvent> d3.event).translate + ") scale(" + (<d3.ZoomEvent> d3.event).scale + ")");
                if ((<d3.ZoomEvent> d3.event).scale<1.1){
                    self.container.attr(
                        "transform",
                        "translate(" + (<d3.ZoomEvent> d3.event).translate + ") scale(1.1)");
                }

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
        console.log("drawboard Parameter" + node);
        this.parametersStatus.setSelectedNode(node);
    }

    setResult(node: ProcessNode) {
        this.resultsService.setSelectedNode(node);
    }

    constructor(private drawBoardStatus: DrawboardStatusService,
                private parametersStatus: ParametersStatusService,
                private resultsService: ResultService,
                private submitService: SubmitService,
                private globalService: GlobalService,
                private processService: ProcessService) {
    }

    public update() {
        this.justDragged = false;
        this.dragLine.attr("d", "M0,0L0,0")
            .classed("hidden", true);
        this.shiftDrag = false;
        this.dragFrom = null;
    }

    ngOnInit() {
        this.drawBoardStatus.setSubmitClickHook(this.getSubmitHandler());
        let self = this;

        self.initState();
        self.initSVG();    //初始化svg渲染和箭头图标等
        self.bindEventHandler();

        if (this.isReload) {
            let taskName = this.drawBoardStatus.getTaskName();
            //noinspection TypeScriptUnresolvedFunction
            this.processService.getDataByTaskName(taskName).then(
                response => {
                    let reRenderData:SubmitJson = response;
                    this.reRender(reRenderData);
                }
            )
        }
    }
    reRender(reRenderData: SubmitJson){
        let self = this;
        let position: {x: number; y: number}[] = [
            {x: 245, y: 104},
            {x: 476, y: 104},
            {x: 225, y: 195},
            {x: 467, y: 202},
            {x: 491, y: 290},
            {x: 300, y: 328},
            {x: 312, y: 415},
        ];
        let count = 0;
        console.log("ReRender");
        let dataSourceNode: DataSourceNode[] = reRenderData.sources.map(
            (dataSourceNodeType2) => {
                let flowID:number = +dataSourceNodeType2.flowID;
                let dataSourceNodeTypeJSON: DataSourceNodeTypeJSON = {
                    id: dataSourceNodeType2.id,
                    label: dataSourceNodeType2.label,
                    description: dataSourceNodeType2.description,
                    parameters:dataSourceNodeType2.parameters
                }
                let dataSourceNodeType: DataSourceNodeType = new DataSourceNodeType(dataSourceNodeTypeJSON);
                let dataSourceNode: DataSourceNode = new DataSourceNode(dataSourceNodeType, flowID, self, position[count++]);
                console.log(dataSourceNode);
                return dataSourceNode;
            }
        );
        let processNode: ProcessNode[] = reRenderData.processes.map(
            (processNodeType2) =>{
                let flowID:number = +processNodeType2.flowID;
                let processNodeTypeJSON: ProcessNodeTypeJSON = {
                    id: processNodeType2.id,
                    label: processNodeType2.label,
                    description: processNodeType2.description,
                    parameters: processNodeType2.parameters
                }
                let processNodeType: ProcessNodeType = new ProcessNodeType(processNodeTypeJSON);
                let processNode: ProcessNode = new ProcessNode(processNodeType, flowID, self, position[count++]);
                console.log(processNode);
                return processNode;
            }
        );

        for(let dataSource of dataSourceNode){
            self.nodes.push(dataSource);
            dataSource.render();
        }

        for(let process of processNode){
            self.nodes.push(process);
            process.render();
        }

        let paths = reRenderData.paths;
        for(let path of paths){
            let [from, to] = path.split("->");
            console.log("from: "+from + "\nto: "+to);
            let relation = new Relation(self, this.nodes[from], this.nodes[to]);
            this.nodes[from].relations.push(relation);
            this.nodes[to].relations.push(relation);
        }
    }
    getSubmitHandler(): (()=>void) {
        let self = this;
        this.type = this.drawBoardStatus.getType();
        console.log(this.type);

        if (this.type == 1)
            return ()=> {

                self.submitService.submit4map(self.getWorkflowJSON());
            };
        return ()=> {
            let len = this.nodes.length - 1;
            console.log(JSON.stringify(self.nodes[len]));
            self.globalService.setLastFLowID(+self.nodes[len].attributes.flowID);
            self.globalService.setLastID(+self.nodes[len].attributes.id);
            self.submitService.submit(self.getWorkflowJSON());
        }
    }

}
