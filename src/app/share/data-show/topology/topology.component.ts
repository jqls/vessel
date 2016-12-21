/**
 * Created by zhaoli on 16-12-18.
 */
import {Component, OnInit} from "@angular/core";
import * as d3 from "d3";
import color = d3.color;
import {nodePara,edgePara} from "./topologyPara";
import {  Http } from "@angular/http";
import {findIndex} from "rxjs/operator/findIndex";
import transform = d3.transform;
import ZoomEvent = d3.ZoomEvent;
@Component({
  selector: 'topological-diagram',
  templateUrl: 'topology.component.html',
  styleUrls: ['topology.component.css']
})
export class topologyComponent implements OnInit{
  public nodeSet:nodePara[]=[];
  public edgeSet:edgePara[]=[];
  // public dataSet=["1,3,2,4,5","2,3,3,4,5","3,3,4,4,5",
  //   "4,3,3,4,5","3,3,5,4,5","6,3,5,4,5","2,3,3,4,6","2,3,3,4,6","6,3,4,4,5"
  //   ,"2,3,3,4,7","2,3,3,4,6777"];
  public dataSet=[];
  constructor(private http:Http){

  }
  ngOnInit(){
    this.getData();
    //this.initSvg();
  }
  getData(){//获取数据
    let dataUrl="http://10.5.0.222:8080/dispatcher/visualization/7-63-31-2-31-50/";
    return this.http.get(dataUrl).toPromise().then(response=>{
      //this.dataSet.push(response.json());
      this.dataSet=response.json();
      this.initSvg();
      console.log(this.dataSet);
    })
      .catch(this.handleError);
  }

  public initSvg(){
    console.log("initSvg()");
    for(let data of this.dataSet){
      let[SIp,SPort,DIp,DPort,Pro]=data.split(",");
      this.nodeSet.push({"name": SIp, "sPort": SPort});
      this.nodeSet.push({"name":DIp,"dPort":DPort});
      this.nodeSet=this.removeRepeat(this.nodeSet);
      this.edgeSet.push({"source":this.requireIndex(SIp),"target":this.requireIndex(DIp),"pro": Pro});
    }
//     //sort links by source, then target
//     this.edgeSet.sort(function(a,b) {
//       if (a.source > b.source) {return 1;}
//       else if (a.source < b.source) {return -1;}
//       else {
//         if (a.target > b.target) {return 1;}
//         if (a.target < b.target) {return -1;}
//         else {return 0;}
//       }
//     });
// // //any links with duplicate source and target get an incremented 'linknum'
// //     for (var i=0; i<this.edgeSet.length; i++) {
// //       if (i != 0 &&
// //         this.edgeSet[i].source == this.edgeSet[i-1].source &&
// //         this.edgeSet[i].target == this.edgeSet[i-1].target) {
// //         this.edgeSet[i].linknum = this.edgeSet[i-1].linknum + 1;
// //       }
// //       else {this.edgeSet[i].linknum = 1;};
// //     };

    var width = 800;
    var height = 600;

    var zoom = d3.behavior.zoom()
      .scaleExtent([0, 100])
      .on("zoom", zoomed);

    var svg = d3.select("svg#topological")
        .append("g")
        .call(zoom)
      ;

    function zoomed(){
      var evt:ZoomEvent = <d3.ZoomEvent> d3.event;
      svg.attr("transform", "translate(" + evt.translate + ")scale(" + evt.scale + ")");
    }

    var force = d3.layout.force()
      .nodes(this.nodeSet)		//指定节点数组
      .links(this.edgeSet)		//指定连线数组
      .size([width,height])	//指定范围
      .linkDistance(100)	//指定连线长度
      .charge(-400);	//相互之间的作用力
    force.start();	//开始作用
    //添加连线

    var svg_edges = svg.selectAll("line")
      .data(this.edgeSet)
      .enter()
      .append("line")
      .style("stroke","#ccc")
      .style("stroke-width",1);


    //创建箭头标记
    svg.append("svg:defs").selectAll("marker")
      .data(this.edgeSet)
      .enter().append("svg:marker")
      .attr("id", "arrow")
      //.attr("markerUnits","userSpaceOnUse")
      .attr("viewBox", "0 -5 10 10")//坐标系的区域
      .attr("refX", 25)
      .attr("refY", -1.5)
      .attr("markerWidth", 6)
      .attr("markerHeight", 6)
      .attr("orient", "auto")
      //.attr("stroke-width",5)//箭头宽度
      .append("svg:path")
      .attr("d", "M0,-5L10,0L0,5")////箭头的路径
      .attr('fill','#000000');
    // 画弧线
    var path = svg.append("svg:g").selectAll("path")
      .data(this.edgeSet)
      .enter().append("svg:path")
      .attr("id",function (d,i) {
        return "path"+i;
      })
      .style("stroke","#ccc")
      .attr("fill","none")
      .attr("marker-end","url(#arrow)");
//-------------------------------------------------------
//     path.append("text")
//       .style("fill","red")
//       .attr("x",12)
//       .attr("y",1)
//       .attr('text-anchor', 'middle')
//       .text(function () {
//         return "test";
//       })
//------------------------------------------------------

    var color = d3.scale.category20();

    //添加节点
    var svg_nodes = svg.selectAll("circle")
      .data(this.nodeSet)
      .enter()
      .append("circle")
      .attr("r",10)
      .style("fill",function(d,i){
        return color(<any>i);
      })
     .call(force.drag);	//使得节点能够拖动

    //添加描述节点的文字
    var svg_texts = svg.selectAll("text")
      .data(this.nodeSet)
      .enter()
      .append("text")
      .style("fill", "black")
      .attr("dx", 20)
      .attr("dy", 8)
      .text(function(d){
        return d.name;
      });

    var linktext = svg.append("svg:g").selectAll("g.linklabelholder").data(this.edgeSet);

    linktext.enter().append("g").attr("class", "linklabelholder")
      .append("text")
      .attr("class", "linklabel")
      .style("font-size", "13px")
      .attr("x", "50")
      .attr("y", "-20")
      .attr("text-anchor", "start")
      .style("fill","#000")
      .append("textPath")
      .attr("xlink:href",function(d,i) { return "#path" + i;})
      .text(function(d) {
        return d.pro;
      });

    force.on("tick", function(){	//对于每一个时间间隔

      //更新连线坐标
      // svg_edges.attr("x1",function(d){ return (<any>d.source).x; })
      //     .attr("y1",function(d){ return (<any>d.source).y; })
      //     .attr("x2",function(d){ return (<any>d.target).x; })
      //     .attr("y2",function(d){ return (<any>d.target).y; });

      //更新节点坐标
      svg_nodes.attr("cx",function(d){ return (<any>d).x; })
        .attr("cy",function(d){ return (<any>d).y; });

      //更新文字坐标
      svg_texts.attr("x", function(d){ return (<any>d).x; })
        .attr("y", function(d){ return (<any>d).y; });

      // //更新弧线文字坐标
      // arc_text.attr("x",function (d) { return ((<any>d.target).x+(<any>d.source).x)/2 })
      //   .attr("y",function (d) { return ((<any>d.target).y+(<any>d.source).y)/2 });


      path.attr("d", function(d,i) {
        var dx = (<any>d.target).x - (<any>d.source).x,//增量
          dy = (<any>d.target).y - (<any>d.source).y,
         //dr = Math.sqrt(dx * dx + dy * dy)/(i+1);
          //dr=Math.sqrt(dx * dx + dy * dy)+i;
         // dr=Math.sqrt(dx * dx + dy * dy)-i*20
          dr = Math.sqrt(dx * dx + dy * dy-i*dx);//+Math.floor(Math.random() * 600)
        return "M" + (<any>d.source).x + ","
          + (<any>d.source).y + "A" + dr + ","
          + dr + " 0 0,1 " + (<any>d.target).x + ","
          + (<any>d.target).y;
      });

    });
  }


  requireIndex(name:string){
    for(let i=0;i<this.nodeSet.length;i++){
      if(name===this.nodeSet[i].name){
        return i;
      }
    }
  }
  removeRepeat(node:nodePara[]){
    for(let i=0;i<node.length;i++){
      for (let j=i+1;j<node.length;j++){
        if (node[i].name==node[j].name){
          node.splice(j,1);
        }
      }
    }
    return node;

  }


  private handleError(error: any) {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }
}



