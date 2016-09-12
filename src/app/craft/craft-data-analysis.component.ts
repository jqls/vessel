///<reference path="../shared/echarts.d.ts"/>
import { Component, OnInit } from '@angular/core';
@Component({
  moduleId: module.id,
  selector: 'app-craft-data-analysis',
  templateUrl: 'craft-data-analysis.component.html',
  styleUrls: ['craft-data-analysis.component.css']
})
export class CraftDataAnalysisComponent implements OnInit {
  myChart;
  constructor() {

  }

  ngOnInit() {
    console.log(d3.select('#main').node());
    this.myChart = echarts.init(d3.select('#main').node() as HTMLDivElement);
    console.log(this.myChart);
    d3.json('app/craft/data.json',(json) => {
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
    });
  }

}
