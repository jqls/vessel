import {Component, OnInit} from "@angular/core";
import {ParametersStatusService} from "../parameters-status.service";
import {FormGroup} from "@angular/forms";
import {ProcessNodeType} from "../drawboard.component/internal/drawboard.node";

@Component({
  moduleId: module.id,
  selector: 'app-parameters',
  templateUrl: 'parameters.component.html',
  styleUrls: ['parameters.component.css'],
})
export class ParametersComponent implements OnInit {

  open: boolean;
  openedNode: ProcessNodeType;
  form: FormGroup;

  constructor(private parametersStatus: ParametersStatusService) {
    this.open = false;
    parametersStatus.bookService((node: ProcessNodeType)=> {
      //todo: wired assign
      this.open = (node != null);
      this.openedNode = node;
      this.form = parametersStatus.toFormGroup();
    });
  }

  onSubmit() {
    //todo: 更新参数
    alert(JSON.stringify(this.form.value));
  }

  ngOnInit() {

  }

}