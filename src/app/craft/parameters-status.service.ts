import {Injectable} from "@angular/core";
import {Validators, FormGroup, FormControl} from "@angular/forms";
import {ProcessNodeType} from "./drawboard.component/internal/drawboard.node";

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
    this.subscribers.forEach((s)=>s(newNode))
  }

  toFormGroup() {
    let group: any = {};
    this.selectedNode.algorithmParameters.forEach(parameter => {
      group[parameter.label] = parameter.required ?
          new FormControl(parameter.val || '', Validators.required) : new FormControl(parameter.val || '');
    });
    return new FormGroup(group);
  }

}
