import {Injectable} from "@angular/core";
import {Validators, FormGroup, FormControl} from "@angular/forms";
import {WorkflowNode} from "./drawboard.component/internal/drawboard.node";
import {ProcessNodeType} from "./drawboard.component/internal/drawboard.node-types";

@Injectable()
export class ParametersStatusService {

  selectedNode: ProcessNodeType;
  subscribers: Array<(node: ProcessNodeType)=>void>;

  constructor() {
    this.subscribers = Array<(node: ProcessNodeType)=>void>();
  }

  bookService(bookFunction: (node: ProcessNodeType)=>void) {
    this.subscribers.push(bookFunction);
  }

  setSelectedNode(newNode: ProcessNodeType) {
    this.selectedNode = newNode;
    this.subscribers.forEach((s)=>s(newNode));
  }

  toFormGroup() {
    let group: any = {};
    this.selectedNode.parameters.forEach(parameter => {
      group[parameter.label] = parameter.required ?
        new FormControl(parameter.val || '', Validators.required) : new FormControl(parameter.val || '');
    });
    return new FormGroup(group);
  }

  updatePatameters(form: FormGroup) {
    this.selectedNode.parameters.forEach(parameter => {
      parameter.val = form.value[parameter.label];
    });
  }

}
