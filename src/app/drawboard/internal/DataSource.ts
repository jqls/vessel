///<reference path="../../shared/d3.d.ts"/>

import {DrawboardElement, ELEMENT_ROUND_X, ELEMENT_WIDTH, ELEMENT_HEIGHT, ELEMENT_ROUND_Y} from "./DrawboardElement";


export class DataSource extends DrawboardElement {

  rendered = false;


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
        .html("数据源");

      this.rendered = true;
    }
  }
}
