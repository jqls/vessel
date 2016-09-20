import {ELEMENT_WIDTH, ELEMENT_HEIGHT} from "./drawboard.element";
import {DrawboardMenu} from "./drawboard.menu";
import {WorkflowNode} from "./drawboard.node";
import {DrawboardComponent} from "../drawboard.component";
import * as d3 from "d3";


/**
 * Created by tang on 7/18/16.
 */


export class Relation {
    from: WorkflowNode;
    to: WorkflowNode;
    menu = new DrawboardMenu();
    path: any;

    initMenu(): void {
        this.menu.addItem("删除", this.deleteElements());
        this.menu.addMenuTo(this);
        console.log("relation-init");
    }

    deleteElements(): (()=>void) {
        let self = this;
        return ()=> {
            self.path.remove();
            let menu = d3.select(self.menu.menuNode);
            menu.remove();
        }
    }

    deleteElement(): void {
        console.log("deleteElement");
        this.path.remove();
        // console.log(self);
        let menu = d3.select(this.menu.menuNode);
        // console.log(menuNode);
        menu.remove();
    }

    constructor(drawboard: DrawboardComponent, from: WorkflowNode, to: WorkflowNode) {
        this.path = drawboard.relationLayer.append('path');
        this.from = from;
        this.to = to;
        this.path.classed('path', true)
            .style('marker-end', 'url(/craft#mark-end-arrow)');
        this.update();
        this.initMenu();
    }

    getToPosition(): {x: number, y: number} {
        var x3 = 0, y3 = 0;
        let deltaY = this.to.cy - this.from.cy;
        let deltaX = this.to.cx - this.from.cx;
        // console.log("deltaX = "+deltaX+"deltaY = "+deltaY);
        if (Math.abs(deltaX) < 1) {
            return {
                'x': this.to.cx + ELEMENT_WIDTH / 2,
                'y': this.to.cy
            };
        }

        let k0 = ELEMENT_HEIGHT / ELEMENT_WIDTH;
        let k = -(deltaY / deltaX);
        // console.log(k);
        if (Math.abs(k) <= k0) {
            if (deltaX >= 0) {
                // console.log("-----1------");
                x3 = this.to.cx;
                y3 = this.to.cy + ELEMENT_HEIGHT / 2 + ELEMENT_WIDTH / 2 * k;
            } else {
                // console.log("-----2------");
                x3 = this.to.cx + ELEMENT_WIDTH;
                y3 = this.to.cy + ELEMENT_HEIGHT / 2 - ELEMENT_WIDTH / 2 * k;
            }
        } else {
            if (deltaY >= 0) {
                // console.log("-----3------");
                x3 = this.to.cx + ELEMENT_WIDTH / 2 + ELEMENT_HEIGHT / 2 / k;
                y3 = this.to.cy;
            } else {
                // console.log("-----4------");
                x3 = this.to.cx + ELEMENT_WIDTH / 2 - ELEMENT_HEIGHT / 2 / k;
                y3 = this.to.cy + ELEMENT_HEIGHT;
            }
        }

        return {
            'x': x3,
            'y': y3
        };
    }

    getFromPosition(): {x: number, y: number} {
        return {
            'x': this.from.cx + ELEMENT_WIDTH / 2,
            'y': this.from.cy + ELEMENT_HEIGHT / 2
        };
    }

    getDAttribute(): string {
        let fromPosition = this.getFromPosition();
        let from = 'M' + fromPosition.x + ',' + fromPosition.y;
        let toPosition = this.getToPosition();
        return from + 'L' + toPosition.x + ',' + toPosition.y;
    }


    update() {
        this.path.attr('d', this.getDAttribute());
    }
}
