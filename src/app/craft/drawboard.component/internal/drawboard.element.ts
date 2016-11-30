/**
 * Created by tang on 7/16/16.
 */


import {Relation} from "./drawboard.relation";
import {DrawboardComponent} from "../drawboard.component";
import {DrawboardMenu} from "./drawboard.menu";
import {BasicNode} from "./drawboard.node";
import {WorkflowNodeType} from "./drawboard.node-types";
import * as d3 from "d3";



export const ELEMENT_HEIGHT = 50;
export const ELEMENT_WIDTH = 150;
export const ELEMENT_ROUND_X = 5;
export const ELEMENT_ROUND_Y = 5;


export class DrawboardElement {
    attributes = new BasicNode();
    board: DrawboardComponent;
    cx: number;
    cy: number;
    groupContainer: any;
    relations: Relation[];
    rendered: boolean = false;
    menu: DrawboardMenu;

    setCenterPosition(d: {x: number; y: number}): void {
        this.cx = d['x'];
        this.cy = d['y'];
        this.groupContainer.attr("transform", "translate(" + this.cx + "," + this.cy + ")");
    }

    initMenu(): void {
        this.menu = new DrawboardMenu();
        this.menu.addItem("删除", this.deleteElements());
        this.menu.addItem("复制",this.copyElements());
        this.menu.addMenuTo(this);
    }

    deleteElements(): (()=>void) {
        let self = this;
        return ()=> {
            console.log("delete");
            self.relations.forEach((relation)=> {
                if (relation.from.attributes.id == self.attributes.id) {
                    relation.to.relations = relation.to.relations.filter((toRelation)=> {
                        return !(toRelation === relation);
                    });
                } else if (relation.to.attributes.id == self.attributes.id) {
                    relation.from.relations = relation.from.relations.filter((fromRelation)=> {
                        return !(fromRelation === relation);
                    });
                }
                console.log("from: " + relation.from.attributes.id + " to:" + relation.to.attributes.id);
                relation.deleteElement();
            });

            self.groupContainer.remove();
            self.board.nodes = self.board.nodes.filter((drawElement)=> {
                return !(drawElement === <DrawboardElement>self);
            });

            d3.select(self.menu.menuNode).remove();
            //处理Parameters
            self.board.setParameter(null);
            //处理Result
            self.board.setResult(null);
        }
    }

    copyElements(): (()=>void ){
        /*
        let self=this;
        //let copyElements=lodash_.cloneDeep(self) ;
        let copyElements=Object.assign(self);
        */
        return()=>{
           // console.log("复制"+copyElements.attributes.label);
          //  copyElements.render();
            //处理Parameters
        };

    }


    constructor(board: DrawboardComponent,
                centerPosition: {x: number, y: number},
                flowID: number,
                nodeType: WorkflowNodeType) {

        this.attributes.id = nodeType.id;
        this.attributes.label = nodeType.label;
        this.attributes.description = nodeType.description;
        this.attributes.flowID = flowID;
        this.relations = [];
        this.board = board;
        this.groupContainer = board.container.append("g");
        this.setCenterPosition(centerPosition);
        this.initMenu();
    }
}
