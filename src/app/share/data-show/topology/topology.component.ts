/**
 * Created by zhaoli on 16-12-18.
 */
import {Component, OnInit, Input, OnDestroy} from "@angular/core";
import * as d3 from "d3";
import {nodePara,edgePara} from "./topologyPara";
import {  Http } from "@angular/http";
import {DataJSON} from "../data-types";
import {GlobalService} from "../../../global.service";
import {DataShowComponent} from "../data-show.component"
@Component({
  selector: 'topological-diagram',
  templateUrl: 'topology.component.html',
  styleUrls: ['topology.component.css']
})
export class topologyComponent implements OnInit,OnDestroy{

  @Input() data: Promise<DataJSON[]>;
  dataJSON:DataJSON[];
  private workflow_id: number;
  private datashow:DataShowComponent;
  public nodeSet:nodePara[]=[];
  public edgeSet:edgePara[]=[];
  public dataSet=["1,3,2,4,5","2,3,3,4,5","3,3,4,4,5",
    "4,3,3,4,5","3,3,5,4,5","6,3,5,4,5","6,3,4,4,5"];
 // public dataSet=[];//正式运行时调用
  constructor(private globalService: GlobalService,private http:Http){
    // this.globalService.book_workflowID((id) => {//正式运行时调用
    //   this.workflow_id = id
    // });
  }
  ngOnInit(){
    d3.select("#main").select(".plotly").remove();
   //this.getData();//正式运行时调用
   //  this.data.then((response: DataJSON[]) => {
   //    this.dataJSON = response;
   //    this.initSvg();
   //  }).catch(this.handleError);
    this.initSvg();
  }
  getData(){//获取数据
    let workflow_id = this.workflow_id;
    let mission_id = this.globalService.mission_id;
    let processor_id = this.globalService.processor_id;
    let flow_id = this.globalService.flow_id;
    let port_id = this.globalService.port_id;
    //需要显示的IP和对应的数量
    let  showIp=this.datashow.topolopyShowIp;
    let  showNum=this.datashow.topolopyShowNum;
    //let dataUrl="http://10.5.0.222:8080/dispatcher/visualization/"+ workflow_id + '-' + mission_id + '-' + processor_id + '-' + flow_id + '-' + port_id + '-' + 50;
    let dataUrl="http://10.5.0.222:8080/dispatcher/visualization/"+ workflow_id + '-' + mission_id + '-' + processor_id + '-' + flow_id + '-' + port_id + '-' +showNum+ '-' +showIp;
    console.log(dataUrl)
    return this.http.get(dataUrl).toPromise().then(response=>{
      //this.dataSet.push(response.json());
      this.dataSet=response.json();
      this.initSvg();
      console.log(this.dataSet);
    })
      .catch(this.handleError);
  }

  public initSvg(){

    for(let data of this.dataSet){
      let[SIp,SPort,DIp,DPort,Pro]=data.split(",");
      this.nodeSet.push({"name": SIp, "sPort": SPort});
      this.nodeSet.push({"name":DIp,"dPort":DPort});
      this.nodeSet=this.removeRepeat(this.nodeSet);
      this.edgeSet.push({"source":this.requireIndex(SIp),"target":this.requireIndex(DIp),"pro": Pro});
    }
    //确定节点直接的链接关系,相互链接的设置为true
    var linkedByIndex = {};
    this.edgeSet.forEach(function(d) {
      linkedByIndex[d.source + "," + d.target] = true;
    });

    var width = 1000;
    var height = 600;
    var margin = {top: -5, right: -5, bottom: -5, left: -5};
    var zoom = d3.behavior.zoom()
      .scaleExtent([0, 100])
      .on("zoom", zoomed);

    var drag = d3.behavior.drag()
      .on("dragstart", dragstarted)
      .on("drag", dragged)
      .on("dragend", dragended);


    var svg = d3.select("#main").append("svg")
        .attr("width",width).attr("height",height)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.right + ")")
        .call(zoom)
      ;
    var rect = svg.append("rect")
      .attr("width", width)
      .attr("height", height)
      .style("fill", "none")
      .style("pointer-events", "all");

    var container=svg.append("g");

    function zoomed(){
      svg.attr("transform",
        "translate(" + (<d3.ZoomEvent> d3.event).translate + ") scale(" + (<d3.ZoomEvent> d3.event).scale + ")");
    }

    function dragstarted(d) {
      (<d3.DragEvent> d3.event).sourceEvent.stopPropagation();
       d3.select(this).classed("dragging", true);
       force.start();
    }

    function dragged(d) {

      d3.select(this).attr("cx", d.x = (<d3.DragEvent> d3.event).x).attr("cy", d.y = (<d3.DragEvent> d3.event).y);
    }

    function dragended(d) {

      d3.select(this).classed("dragging", false);
    }

    var force = d3.layout.force()
      .nodes(this.nodeSet)		//指定节点数组
      .links(this.edgeSet)		//指定连线数组
      .size([width,height])	//指定范围
      .linkDistance(100)	//指定连线长度
      .charge(-400)  //相互之间的作用力
      .start();	 //开始作用


    //创建箭头标记
    container.append("svg:defs").selectAll("marker")
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
    var path = container.append("svg:g").selectAll("path")
      .data(this.edgeSet)
      .enter().append("svg:path")
      .attr("id",function (d,i) {
        return "path"+i;
      })
      .style("stroke","#ccc")
      .attr("fill","none")
      .attr("marker-end","url(#arrow)");

    var color = d3.scale.category20();

    //添加节点
    var svg_nodes = container.append("g").selectAll("circle")
      .data(this.nodeSet)
      .enter()
      .append("circle")
      .attr("r",10)
      .style("fill",function(d,i){
        return color(<any>i);
      })
      .call(drag);	//使得节点能够拖动
    svg_nodes.on("dbclick.zoom",function (d) {
      event.stopPropagation();
      var dcx = (width/2-(<any>d).x*zoom.scale());
      var dcy = (height/2-(<any>d).y*zoom.scale());
      zoom.translate([dcx,dcy]);
      container.attr("transform", "translate("+ dcx + "," + dcy  + ")scale(" + zoom.scale() + ")");

    })

    var focus_node = null, highlight_node = null;
    var highlight_color = "red";
    var towhite = "stroke";
    var default_link_color = "#888";
    var highlight_trans = 0.1;
    svg_nodes.on("mouseover", function(d) {
      set_highlight(d);
    })
      .on("mousedown", function(d) {
        event.stopPropagation();
        focus_node = d;
        set_focus(d)
        if (highlight_node === null) set_highlight(d)

      }	).on("mouseout", function(d) {
           exit_highlight();
    }	);

    //当在元素上释放鼠标按钮时触发
    d3.select(window).on("mouseup",
      function() {
        if (focus_node!==null)
        {
          focus_node = null;
          // if (highlight_trans<1)
          // {

            svg_nodes.style("opacity", 1);
            svg_texts.style("opacity", 1);
            linktext.style("opacity", 1);
            path.style("opacity", 1);
          //}
        }

        if (highlight_node === null) exit_highlight();
      });
    //鼠标离开节点事件--正常显示
    function exit_highlight()
    {
      highlight_node = null;
      if (focus_node===null)
      {
        svg.style("cursor","move");
        if (highlight_color!="white")
        {
          svg_nodes.style(towhite, "white");
          svg_texts.style("font-weight", "normal");
          linktext.style("font-weight", "normal")
          path.style("stroke", function(o) {return "#ccc"});
        }

      }
    }
    //确定节点直接的链接关系,相互链接的return为true
    function isConnected(a, b) {
      return linkedByIndex[a.index + "," + b.index] || linkedByIndex[b.index + "," + a.index] || a.index == b.index;
    }
    //鼠标按下时的处理函数--设置相应的透明度，突出显示相应节点
    function set_focus(d)
    {
      if (highlight_trans<1)  {
        svg_nodes.style("opacity", function(o) {
          return isConnected(d, o) ? 1 : highlight_trans;
        });

        svg_texts.style("opacity", function(o) {
          return isConnected(d, o) ? 1 : highlight_trans;
        });
        linktext.style("opacity", function(o) {
          return (<any>o.source).name == d.name|| (<any>o.target).name == d.name? 1 :  highlight_trans;
        });
        path.style("opacity", function(o) {
          return (<any>o.source).name == d.name|| (<any>o.target).name == d.name? 1 :  highlight_trans;
        });
      }
    }
    //把相互关联的各节点高亮标出显示
    function set_highlight(d)
    {
      svg.style("cursor","pointer");
      if (focus_node!==null) d = focus_node;
      highlight_node = d;

      if (highlight_color!="white")
      {
        svg_nodes.style(towhite, function(o) {
          return isConnected(d, o) ? highlight_color : "white";});
        svg_texts.style("font-weight", function(o) {
          return isConnected(d, o) ? "bold" : "normal";});
        linktext.style("font-weight", function(o) {
          return (<any>o.source).name == d.name|| (<any>o.target).name == d.name? "bold" : "normal";
        });
        path.style("stroke", function(o) {
          return (<any>o.source).name == d.name|| (<any>o.target).name == d.name? highlight_color : default_link_color;

        });
      }
    }
    //添加描述节点的文字
    var svg_texts = container.selectAll("text")
      .data(this.nodeSet)
      .enter()
      .append("text")
      .style("fill", "black")
      .attr("dx", 20)
      .attr("dy", 8)
      .text(function(d){
        return d.name;
      });

    var linktext = container.append("svg:g").selectAll("g.linklabelholder").data(this.edgeSet);

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

      //更新节点坐标
      svg_nodes.attr("cx",function(d){ return (<any>d).x; })
        .attr("cy",function(d){ return (<any>d).y; });

      //更新文字坐标
      svg_texts.attr("x", function(d){ return (<any>d).x; })
        .attr("y", function(d){ return (<any>d).y; });

      path.attr("d", function(d,i) {
        var dx = (<any>d.target).x - (<any>d.source).x,//增量
          dy = (<any>d.target).y - (<any>d.source).y,
          dr = Math.sqrt(dx * dx + dy * dy-i*dx);//+Math.floor(Math.random() * 600)
        return "M" + (<any>d.source).x + ","
          + (<any>d.source).y + "A" + dr + ","
          + dr + " 0 0,1 " + (<any>d.target).x + ","
          + (<any>d.target).y;
      });

    });
  }
  ngOnDestroy(): void {
    d3.select("#main").select("svg").remove();
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



