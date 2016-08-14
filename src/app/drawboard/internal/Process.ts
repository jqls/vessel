///<reference path="../../shared/d3.d.ts"/>

import {DrawboardElement, ELEMENT_ROUND_Y, ELEMENT_ROUND_X, ELEMENT_HEIGHT, ELEMENT_WIDTH} from "./DrawboardElement";


export class Process extends DrawboardElement {

    rendered = false;


    render() {
        if (!this.rendered) {
            this.groupContainer.append("rect")
                .attr("rx", ELEMENT_ROUND_X)
                .attr("ry", ELEMENT_ROUND_Y)
                .classed("process", true)
                .attr("height", ELEMENT_HEIGHT)
                .attr("width", ELEMENT_WIDTH);
            this.groupContainer
                .append("text")
                .attr("text-anchor", "middle")
                .attr("dy", ELEMENT_HEIGHT / 2)
                .attr("dx", ELEMENT_WIDTH / 2)
                .append("tspan")
                .html("处理流程");

            this.rendered = true;
        }
    }
}
