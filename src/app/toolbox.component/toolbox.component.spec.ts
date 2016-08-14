/* tslint:disable:no-unused-variable */

import {ToolboxComponent} from "./toolbox.component";
import {DrawboardStatusService} from "../drawboard-status.service";
import {ProcessService} from "../process.service";

describe('Component: Toolbox', () => {
  let drawboardStatus: DrawboardStatusService = new DrawboardStatusService();
  let processService: ProcessService = new ProcessService();

  it('should create an instance', () => {
    let component = new ToolboxComponent(drawboardStatus, processService);
    expect(component).toBeTruthy();
  });
});
