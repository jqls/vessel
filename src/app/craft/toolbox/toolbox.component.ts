import {Component, OnInit} from '@angular/core';
import {DataService} from "../../data.service";
import {Dataset, WorkflowNodeType} from "../../share/data-types";
import {CraftService} from "../craft.service";
import {mydebug} from "../../share/my-log";

@Component({
  selector: 'app-toolbox',
  templateUrl: './toolbox.component.html',
  styleUrls: ['./toolbox.component.sass']
})
export class ToolboxComponent implements OnInit {
  private debug_location: string = "ToolboxComponent";
  private selectedNodeType: WorkflowNodeType;
  private datasets: Dataset[];
  private algorithms: Algorithm[];

  constructor(private dataService: DataService,
              private craftService: CraftService) {
    //通过订阅者模式保证本地与CraftService中的selectedNodeType的一致
    this.craftService.bookSelectedNodeType((nodeType: WorkflowNodeType) => {
      this.selectedNodeType = nodeType;
      mydebug(this.debug_location, "craftService.bookSelectedNodeType", String(this.selectedNodeType == null));
    });
    this.dataService.getDatasets().then(datasets => {
      this.datasets = datasets;
    });
    this.dataService.getAlgorithms().then(algorithms => {
      this.algorithms = algorithms;
    });

    this.craftService.setSelectedNodeType(null);
  }

  ngOnInit() {
  }

  itemClicked(item: WorkflowNodeType) {
    if (this.selectedNodeType == item) {
      this.craftService.setSelectedNodeType(null);
    } else {
      this.craftService.setSelectedNodeType(item);
    }
    mydebug(this.debug_location, "itemClicked", this.selectedNodeType ? this.selectedNodeType.id : 'null');

  }

  isHidden() {//下拉列表的收起和隐藏
    var divid = document.getElementById("zhaoli");
    $("#top1").click(function () {
      var children = $(".second1");

      if (children.is(":visible")) {
        children.hide();
        divid.className = "triangle-collapsed icon-expand";
      } else {
        children.show()

        divid.className = "triangle-expanded icon-expand";
      }
    });
  }
}
