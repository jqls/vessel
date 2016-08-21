import {Injectable} from "@angular/core";
import {ProcessNode} from "../shared/json-typedef";
import {ParameterInputBase} from "./parameters.component/internal/parameter-input-base.class";
import {Validators, FormGroup, FormControl} from "@angular/forms";

@Injectable()
export class ParametersStatusService {

  selectedNode: ProcessNode;
  subscribers: Array<(node: ProcessNode)=>void>;

  constructor() {
    this.subscribers = Array<(node: ProcessNode)=>void>();
  }

  bookService(bookFunction: (node: ProcessNode)=>void) {
    this.subscribers.push(bookFunction);
  }

  setSelectedNode(newNode: ProcessNode) {
    this.selectedNode = newNode;
    this.subscribers.forEach((s)=>s(newNode))
  }

  toFormGroup() {
    let group: any = {};
    this.selectedNode.algorithm_parameters.forEach(parameter => {
      group[parameter.label] =
        parameter.required ?
          new FormControl(parameter.defaultVal || '', Validators.required)
          :
          new FormControl(parameter.defaultVal || '');
    });
    return new FormGroup(group);
  }

}
