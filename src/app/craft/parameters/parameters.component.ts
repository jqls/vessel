import { Component, OnInit } from '@angular/core';
import {CraftService} from "../craft.service";
import {WorkflowNode} from "../drawboard/internal/node-basic";
import {Relation} from "../drawboard/internal/relation";
import {mydebug} from "../../share/my-log";
import {QuestionControlService} from "../../share/dynamic-form/question-control.service";
import {QuestionBase} from "../../share/dynamic-form/questions";
import {FormGroup} from "@angular/forms";
import {ParameterType} from "../../share/json-types";
import {AlgorithmNode} from "../drawboard/internal/node-algorithm";

@Component({
  selector: 'app-parameters',
  templateUrl: './parameters.component.html',
  styleUrls: ['./parameters.component.sass']
})
export class ParametersComponent implements OnInit {
  private debug_location: string = "ParametersComponent";
  private selectedNode: WorkflowNode;
  private selectedRelation: Relation;
  private parameters: ParameterType[];
  questions: QuestionBase<any>[];
  form: FormGroup;

  constructor(private craftService: CraftService,
  private qcs: QuestionControlService) {
    //订阅selectedNode和selectedRelation
    this.craftService.bookSelectedNode((node: WorkflowNode) => {
      this.selectedNode = node;
      this.parameters = node instanceof AlgorithmNode ?
        (<AlgorithmNode>this.selectedNode).nodetype.parameters:
        [];
      this.questions = this.qcs.toQuestions(this.parameters);
      this.form = this.qcs.toFormGroup(this.questions);
    });
    this.craftService.bookSelectedRelation((relation: Relation) => {
      this.selectedRelation = relation;
    });
  }

  ngOnInit() {

  }

  onSubmit() {
    //todo: 更新参数
    mydebug(this.debug_location,"onSubmit","update parameters");
    // this.parametersStatus.updatePatameters(this.form);
  }
}
