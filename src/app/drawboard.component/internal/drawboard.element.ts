///<reference path="../../shared/d3.d.ts"/>
///<reference path="drawboard.menu.ts"/>

/**
 * Created by tang on 7/16/16.
 */
import {Relation} from "./drawboard.relation";
import {DrawboardComponent} from "../drawboard.component";
import {Menu} from "./drawboard.menu";

export const ELEMENT_HEIGHT = 50;
export const ELEMENT_WIDTH = 150;
export const ELEMENT_ROUND_X = 5;
export const ELEMENT_ROUND_Y = 5;


export class DrawboardElement {
    board:DrawboardComponent;
    cx:number;
    cy:number;
    groupContainer:any;
    relations:Relation[ ];
    rendered:boolean = false;
    node_info:{};

    menu:any;

    setCenterPosition(d:{x:number; y:number}):void {
        this.cx = d['x'];
        this.cy = d['y'];
        this.groupContainer.attr("transform", "translate(" + this.cx + "," + this.cy + ")");
    }

    initMenu():void {
        this.menu = new Menu();
        let menu = this.menu;
        menu.addItem("删除", this.deleteElements);
        menu.addMenuTo(this);


    }
    //node:any, menuElement:any
    deleteElements(myself:DrawboardElement):void {
        console.log("delete");
        // console.log(myself);
        // console.log(myself.menu.menu);

        //遍历relations数组
        for (let i = 0, len = myself.relations.length; i < len; i++) {
            let relation = myself.relations[i];
            let num;
            //出入两种情况分别讨论
            if (relation.from === this) {
                let toRelation = relation.to.relations;
                let toLen = toRelation.length;
                //遍历对方relations数组，找到对应连线
                for (let j = 0; j < toLen; j++) {
                    if (toRelation[j] === relation) {
                        num = j;
                        break;
                    }
                }
                toRelation.splice(num, 1);
            } else if (relation.to === this) {
                let fromRelation = relation.from.relations;
                let fromLen = fromRelation.length;
                //遍历对方relations数组，找到对应连线
                for (let j = 0; j < fromLen; j++) {
                    if (fromRelation[j] === relation) {
                        num = j;
                        break;
                    }
                }
                fromRelation.splice(num, 1);
            }
            //删除每一条连线
            relation.deleteElement();
        }

        myself.groupContainer.remove();
        let mymenu = d3.select(myself.menu.menu);
        // console.log(mymenu);
        mymenu.remove();
    }

    constructor(board:DrawboardComponent, centerPosition:{x:number, y:number}, node_info:{}) {
        let tem = this;
        this.relations = [];
        this.node_info = node_info;
        this.board = board;
        this.groupContainer = board.container.append("g");
        this.setCenterPosition(centerPosition);
        let currentObject = this;

        this.initMenu();
        this.groupContainer
            .on("mousedown", function () {
                console.log("mousedown");
                if ((<KeyboardEvent> d3.event).shiftKey) {
                    console.log("shift");
                    board.shiftDrag = true;
                    board.dragline.classed('hidden', false);
                    return;
                } else {
                    board.callParameter(node_info);
                }
            })
            .on("mouseup", function () {
                if (board.justDragged) {
                    if (board.dragFrom != currentObject && currentObject != null && board.dragFrom != null) {
                        let relation = new Relation(board, board.dragFrom, currentObject);
                        currentObject.relations.push(relation);
                        board.dragFrom.relations.push(relation);
                    }
                } else {
                    //todo: context menu
                }
                board.update();
            })
            .on("mouseover", function () {
                if (board.shiftDrag) {
                    currentObject.groupContainer.classed("selected", true);
                }
            })
            .on("mouseout", function () {
                currentObject.groupContainer.classed("selected", false);
            })
            .call(
                d3.behavior.drag()
                    .on("dragstart", function () {
                        (<d3.DragEvent> d3.event).sourceEvent.stopPropagation();
                    })
                    .on("drag", function () {
                        board.justDragged = true;
                        board.dragFrom = currentObject;
                        if (board.shiftDrag) {
                            let mouseCoords = d3.mouse(board.container.node());
                            board.dragline.classed("hidden", false);
                            board.dragline.attr('d', 'M' + (currentObject.cx + ELEMENT_WIDTH / 2) + ',' + (currentObject.cy + ELEMENT_HEIGHT / 2) + 'L' + mouseCoords[0] + ',' + mouseCoords[1]);
                        } else {
                            let dragEvent = <d3.DragEvent> d3.event;
                            currentObject.setCenterPosition({
                                'x': currentObject.cx + dragEvent.dx,
                                'y': currentObject.cy + dragEvent.dy
                            });
                            currentObject.relations.forEach(function (value) {
                                value.update();
                            });
                        }
                    })
                    .on("dragend", function () {
                        board.update();
                    })
            );
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
                .html(this.node_info['name']);
        }
        this.rendered = true;
    }
}
