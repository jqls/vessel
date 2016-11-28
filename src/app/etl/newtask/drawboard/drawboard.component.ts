import { Component, OnInit } from '@angular/core';
import {node} from "../nodes/node";
import * as d3 from "d3";

@Component({
  selector: 'etl-drawboard',
  templateUrl: './drawboard.component.html',
  styleUrls: ['./drawboard.component.sass']
})
export class DrawboardComponent implements OnInit {


  //定义属性
  node_list: node[];//定义采用父类node,初始化时确定具体node类型; 记录当前面板上的所有节点
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
    RESOLUTION_WIDTH: 600,
    RESOLUTION_HEIGHT: 500
  };

  private initSVG(): void{
    this.svg = d3.select("svg#svg");
    this.def = this.svg.append("svg:def");    //绑定样式区
    this.container = this.svg.append("g");    //绑定绘图区
    this.relationLayer = this.container.append("g");  //绑定关系连线区

    this.svg
      .attr("width",this.constants.RESOLUTION_WIDTH)
      .attr("height", this.constants.RESOLUTION_HEIGHT)
      .style({"border":"1px solid silver", "font-size": "25"})
      .classed("drawboard", true);

    this.svg.append('g')
      .attr('class', 'test-rect')
      .attr('cursor', 'pointer')
      .append('rect')
      .attr('onmouseover', 'test(evt)')
      .attr('height', 100)
      .attr('width', 200)
      .attr('rx', 5)
      .attr('ry', 5)
      .attr('x', 0)
      .attr('y',0)
      .attr('stroke','red')
      .attr('fill', 'white');
  }

  ngOnInit(){
    this.initSVG();
  }
}
