import {Injectable} from "@angular/core";
import {Validators, FormGroup, FormControl} from "@angular/forms";
import {ProcessNode} from "./drawboard.component/internal/drawboard.node";

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
    this.subscribers.forEach((s)=>s(newNode));
  }

  toFormGroup() {
    let group: any = {};
    this.selectedNode.algorithmParameters.forEach(parameter => {
      group[parameter.label] = parameter.required ?
          new FormControl(parameter.val || '', Validators.required) : new FormControl(parameter.val || '');
    });
    return new FormGroup(group);
  }

  updatePatameters(form: FormGroup) {
    this.selectedNode.algorithmParameters.forEach(parameter => {
      console.log(form.value[parameter.label]);
      console.log(parameter.val);
      parameter.val = form.value[parameter.label];
    });
    alert(JSON.stringify(this.selectedNode.algorithmParameters));
  }

}
