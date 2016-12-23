import {Component, OnInit, Input} from '@angular/core';
import * as d3 from "d3";
import {CraftService} from "../../craft.service";
import {WorkflowNodeType} from "../../../share/data-types";
import {mydebug} from "../../../share/my-log";
@Component({
  selector: 'app-template',
  templateUrl: './template.component.html',
  styleUrls: ['./template.component.sass']
})
export class TemplateComponent implements OnInit {

  @Input() data;
  private selectedNodeType: WorkflowNodeType;
  private debug_location:string = "TemplateComponent";

  constructor(private craftService: CraftService) {
    //通过订阅者模式保证本地与CraftService中的selectedNodeType的一致
    this.craftService.bookSelectedNodeType((nodeType: WorkflowNodeType) => {
      this.selectedNodeType = nodeType;
    });
  }

  ngOnInit() {

  }

  changeStat(element) {
    let item = d3.select("#" + element);
    if (item.classed("minimized")) {
      item.classed("minimized", false);
      item.classed("maximized", true);
      d3.select("#" + element + " .category-header-title").classed("expanded", true);
    } else if (item.classed("maximized")) {
      item.classed("maximized", false);
      item.classed("minimized", true);
      d3.select("#" + element + " .category-header-title").classed("expanded", false);
    }
  }

}
