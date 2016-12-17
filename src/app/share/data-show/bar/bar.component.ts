import {Component, OnInit, Input} from '@angular/core';
import {DataJSON} from "../data-types";
import * as echarts from "echarts";

@Component({
  selector: 'app-bar',
  templateUrl: './bar.component.html',
  styleUrls: ['./bar.component.sass']
})
export class BarComponent implements OnInit {
  @Input() data: Promise<DataJSON[]>;
  dataJSON:DataJSON[];
  myChart;
  constructor() {
    this.myChart = echarts.init(document.getElementById('main') as HTMLDivElement);
  }
  ngOnInit() {
    this.data.then((response: DataJSON[]) => {
      this.dataJSON = response;
      this.bar()(this.dataJSON);
    }).catch(this.handleError);
  }
  private handleError(error: any) {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }
  private bar() {
    return (json) => {
      console.log("bar");
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
                console.log(json[i].NAME);
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
                console.log(json[i].VAL);
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

}
