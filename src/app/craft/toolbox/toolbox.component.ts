import { Component, OnInit } from '@angular/core';
import {DataService} from "../../data.service";
import {Dataset, WorkflowUnit} from "../../share/data-types";
import {CraftService} from "../craft.service";
import {mydebug} from "../../share/my-log";

@Component({
  selector: 'app-toolbox',
  templateUrl: './toolbox.component.html',
  styleUrls: ['./toolbox.component.sass']
})
export class ToolboxComponent implements OnInit {
  private debug_location: string = "ToolboxComponent";
  private selectedNodeType: WorkflowUnit = null;
  private datasets: Dataset[];
  private algorithms: Algorithm[];

  constructor(private dataService: DataService,
              private craftService: CraftService) {
    this.dataService.getDatasets().then(datasets => {
      this.datasets = datasets;
    });
    this.dataService.getAlgorithms().then(algorithms => {
      this.algorithms = algorithms;
    });
  }

  ngOnInit() {
  }

  itemClicked(item: WorkflowUnit) {
    if (this.selectedNodeType == item) {
      this.selectedNodeType = null;
    } else {
      this.selectedNodeType = item;
    }
    mydebug(this.debug_location,"itemClicked", this.selectedNodeType ? this.selectedNodeType.id : 'null');
    this.craftService.setSelectedNodeType(this.selectedNodeType);
  }

  isHidden() {//下拉列表的收起和隐藏
    var divid = document.getElementById("zhaoli");
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
}
