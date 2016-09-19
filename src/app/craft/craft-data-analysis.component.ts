///<reference path="../shared/echarts.d.ts"/>
import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params} from "@angular/router";
@Component({
  moduleId: module.id,
  selector: 'app-craft-data-analysis',
  templateUrl: 'craft-data-analysis.component.html',
  styleUrls: ['craft-data-analysis.component.css']
})
export class CraftDataAnalysisComponent implements OnInit {

  myChart;
  type:number = null;
  constructor(private route: ActivatedRoute) {
    console.log("charts typr is "+this.type);
  }
  bar(){
    return (json) => {
      let option = {
        tooltip: {
          show: true
        },
        legend: {
          data: ['数据平台']
        },
        xAxis: [
          {
            type: 'category',
            data: (function () {
              let data = [];
              for (let i = 0; i < json.length; i++) {
                data.push(json[i].NAME);
              }
              return data;
            })()
          }
        ],
        yAxis: [
          {
            type: 'value'
          }
        ],
        series: [
          {
            "name": "销量",
            "type": "bar",
            "data": (function () {
              let data = [];
              for (let i = 0; i < json.length; i++) {
                data.push(json[i].VAL);
              }
              return data;
            })()
          }
        ]
      };
      this.myChart.setOption(option);
    };
  }
  pie(){
    return (json)=>{
      let app = {
        currentIndex: null,
        timeTicket: null
      };
      let option = {
        title : {
          text: '饼图高亮',
          x: 'center'
        },
        tooltip: {
          trigger: 'item',
          formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        legend: {
          orient: 'vertical',
          left: 'left',
          data: (()=>{
            let data = [];
            for (let key in json) {
              data.push({
                name:json[key].NAME
              });
            }
            return data;
          })()
        },
        series: [

          {
            name: '访问来源',
            type: 'pie',
            radius : '55%',
            center: ['50%', '60%'],
            data: (()=>{
              let data = [];
              for(let key in json)
                data.push({
                  value:json[key].VAL,
                  name:json[key].NAME
                });
              return data;
            })(),
            itemStyle: {
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }
        ]
      };
      app.currentIndex = -1;
      app.timeTicket = setInterval(()=>{
        let dataLen = option.series[0].data.length;
        // 取消之前高亮的图形
        this.myChart.dispatchAction({
          type: 'downplay',
          seriesIndex: 0,
          dataIndex: app.currentIndex
        });
        app.currentIndex = (app.currentIndex + 1) % dataLen;
        // 高亮当前图形
        this.myChart.dispatchAction({
          type: 'highlight',
          seriesIndex: 0,
          dataIndex: app.currentIndex
        });
        // 显示 tooltip
        this.myChart.dispatchAction({
          type: 'showTip',
          seriesIndex: 0,
          dataIndex: app.currentIndex
        });
      }, 1000);
      if (option && typeof option === "object") {
        this.myChart.setOption(option, true);
      }
    }
  }
  ngOnInit() {
    this.route.params.forEach((params: Params) => {
      let id = +params['id'];
      this.type = id;
      console.log(this.type);
      if(this.myChart == null)
        this.myChart = echarts.init(d3.select('#main').node() as HTMLDivElement);

      switch (this.type){
        case 1:
          // console.log("---1---");
          d3.json('app/craft/data.json',this.bar());
          break;
        case 2:
          // console.log("---2---");
          d3.json('app/craft/data.json',this.pie());
          break;
      }
    });

  }

}
