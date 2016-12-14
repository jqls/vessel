import {Component, OnInit} from '@angular/core';
import {CraftService} from "../craft.service";
import {WorkflowNode} from "../drawboard/internal/node-basic";
import {Relation} from "../drawboard/internal/relation";
import {mydebug} from "../../share/my-log";
import {QuestionControlService} from "../../share/dynamic-form/question-control.service";
import {QuestionBase} from "../../share/dynamic-form/questions";
import {FormGroup} from "@angular/forms";
import {ParameterType} from "../../share/json-types";
import {AlgorithmNode} from "../drawboard/internal/node-algorithm";
import {ProcessorNode} from "../drawboard/internal/node-processor";

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
      // this.parameters = node instanceof AlgorithmNode ?
      //   (<AlgorithmNode>this.selectedNode).nodetype.parameters:
      //   [];
      this.parameters = node instanceof ProcessorNode ?
        (<ProcessorNode>this.selectedNode).nodetype.parameters :
        [];
      console.log(this.parameters);
      if(this.parameters==null)
        this.parameters=[];
      console.log(this.parameters);
      mydebug(this.debug_location, "bookSelectedNode", String(node instanceof ProcessorNode));
      this.questions = this.qcs.toQuestions(this.parameters);
      console.log(this.questions);
      this.form = this.qcs.toFormGroup(this.questions);
      console.log(this.form);
    });

    this.craftService.bookSelectedRelation((relation: Relation) => {
      this.selectedRelation = relation;
    });
  }

  ngOnInit() {

  }

  onSubmit() {
    mydebug(this.debug_location, "onSubmit", "update parameters");
    let node = this.selectedNode;
    // node = node instanceof AlgorithmNode ?
    //   (<AlgorithmNode>this.selectedNode) :
    //   null;
    node = <ProcessorNode>this.selectedNode;
    if (node != null && node.nodetype.parameters != [])
      node.nodetype.parameters.forEach(parameter => {
        parameter.value = this.form.value[parameter.key];
      });
  }
  closeRight(){
    this.craftService.setRightPaneStat(false);
  }
}
