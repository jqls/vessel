import {Component, OnInit} from "@angular/core";
import {DrawboardStatusService} from "../drawboard-status.service";
import {ProcessService} from "../process.service";
import {
    DataSourceNodeType,
    ProcessNodeType,
    WorkflowNodeType
} from "../drawboard.component/internal/drawboard.node-types";

@Component({
    // moduleId: module.id,
    selector: 'app-toolbox',
    templateUrl: 'toolbox.component.html',
    styleUrls: ['toolbox.component.css']
})
export class ToolboxComponent implements OnInit {
    selectedNodeType: WorkflowNodeType = null;
    dataSourceTypes: DataSourceNodeType[];
    processesTypes: ProcessNodeType[];

    constructor(private drawboadStatus: DrawboardStatusService,
                private processService: ProcessService) {
        let self = this;
        this.drawboadStatus.bookSelectedNodeType((node: WorkflowNodeType)=> {
            self.selectedNodeType = node;
        });
        this.processService.getDataSources(processService.SPARKTYPE).then(dataSourceTypes => {
            this.dataSourceTypes = dataSourceTypes;
            // console.log(4);
            // console.log(dataSourceTypes);
        });
        // console.log(1);
        this.processService.getProcesses(processService.SPARKTYPE).then(processesTypes => {
            this.processesTypes = processesTypes;
            // console.log(3);
            // console.log(processesTypes);
            // console.log(this.processesTypes);
        });
    }

    itemClicked(item: WorkflowNodeType) {
        if (this.selectedNodeType == item) {
            this.selectedNodeType = null;
            this.drawboadStatus.cancelSelectedNodeType();
        } else {
            this.selectedNodeType = item;
            this.drawboadStatus.setSelectedNodeType(item);
        }
    }

    itemDbClicked(item: {}) {

    }

    isHidden() {//下拉列表的收起和隐藏
        var divid = document.getElementById("triangle-icon");
        //$("#top1").click(function () {
        var children = $(".second1");

        if (children.is(":visible")) {
            children.hide();
            divid.className = "triangle-collapsed icon-expand";
        } else {
            children.show();

            divid.className = "triangle-expanded icon-expand";
        }

        //});
    }

    isHidden2() {
        $("#top2").click(function () {
            var children = $(".submenu");
            if (children.is(":visible")) {
                children.hide();
            } else {
                children.show();
            }

        });
    }

    isHidden3() {
        $("#top3").click(function () {
            var children = $(".submenu1");
            if (children.is(":visible")) {
                children.hide();
            } else {
                children.show()
            }

        });
    }

    ngOnInit() {

        // console.log("toobox");
        // console.log(this.processesTypes);
    }

  itemDbClicked(item: {}) {

  }

  isHidden() {//下拉列表的收起和隐藏
    var divid = document.getElementById("triangle-icon");
    $("#top1").click(function () {
      var children = $(".second1");

      if (children.is(":visible")) {
        children.hide();
        divid.className="triangle-collapsed icon-expand";
      } else {
        children.show()

        divid.className="triangle-expanded icon-expand";
      }

    });
  }

  ngOnInit() {

    // console.log("toobox");
    // console.log(this.processesTypes);
  }

}
