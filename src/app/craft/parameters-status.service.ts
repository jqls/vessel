import {Injectable} from "@angular/core";
import {Validators, FormGroup, FormControl} from "@angular/forms";
import {WorkflowNode} from "./drawboard.component/internal/drawboard.node";
import {ProcessNodeType} from "./drawboard.component/internal/drawboard.node-types";

@Injectable()
export class ParametersStatusService {

  selectedNode: any;
  subscribers: Array<(node: any)=>void>;

  constructor() {
    this.subscribers = Array<(node: any)=>void>();
  }

  bookService(bookFunction: (node: any)=>void) {
    this.subscribers.push(bookFunction);
  }

  setSelectedNode(newNode: any) {
    this.selectedNode = newNode;
    console.log("PS-setSelectedNode "+newNode);
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
