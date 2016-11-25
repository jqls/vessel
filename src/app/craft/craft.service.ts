import { Injectable } from '@angular/core';
import {WorkflowUnit} from "../share/data-types";

@Injectable()
export class CraftService {
  private selectedNodeType: WorkflowUnit;

  constructor() { }

  setSelectedNodeType(selectedNodeType: WorkflowUnit): void{
    this.selectedNodeType = selectedNodeType;
  }

  getSelectedNodeType(): WorkflowUnit{
    return this.selectedNodeType;
  }
}
