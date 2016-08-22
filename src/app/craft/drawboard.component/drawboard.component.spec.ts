/* tslint:disable:no-unused-variable */

import {DrawboardComponent} from "./drawboard.component";
import {DrawboardStatusService} from "../drawboard-status.service";
import {ParametersStatusService} from "../parameters-status.service";
import {SubmitService} from "../submit.service";

describe('Component: Drawboard', () => {
  let service = new DrawboardStatusService();
  let parameterService = new ParametersStatusService();
  let submitService = new SubmitService();
  it('should create an instance', () => {
    let component = new DrawboardComponent(service, parameterService, submitService);
    expect(component).toBeTruthy();
  });
});
