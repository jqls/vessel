import {Component, OnInit} from "@angular/core";
import {ParametersStatusService} from "../parameters-status.service";
import {FormGroup} from "@angular/forms";
import {DrawboardElement} from "../drawboard.component/internal/drawboard.element";
import {DataSourceNode, ProcessNode} from "../drawboard.component/internal/drawboard.node";

@Component({
  moduleId: module.id,
  selector: 'app-parameters',
  templateUrl: 'parameters.component.html',
  styleUrls: ['parameters.component.css'],
})
export class ParametersComponent implements OnInit {

  open: boolean;
  openedNode: ProcessNode;
  form: FormGroup;

  constructor(private parametersStatus: ParametersStatusService) {
    this.open = false;
    parametersStatus.bookService((node: ProcessNode): void=> {
      this.open = (node != null);
      this.openedNode = node;
      this.form = parametersStatus.toFormGroup();
    });
  }
  // setOpen(node: DrawboardElement): void{
  //   if(node instanceof ProcessNode)
  //     this.open = true;
  //   else if (node instanceof DataSourceNode)
  //     this.open = false;
  // }
  onSubmit() {
    //todo: 更新参数
    console.log("update parameters");
    this.openedNode.updateAlgorithmParameters(this.form.value);
    alert(JSON.stringify(this.form.value));
  }

  ngOnInit() {

  }

}
