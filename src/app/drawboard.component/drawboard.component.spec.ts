/* tslint:disable:no-unused-variable */

import {DrawboardComponent} from "./drawboard.component";
import {DrawboardStatusService} from "../drawboard-status.service";
import {ParametersStatusService} from "../parameters-status.service";

describe('Component: Drawboard', () => {
  let service = new DrawboardStatusService();
<<<<<<< HEAD
  let parametersStatus = new ParametersStatusService();

  it('should create an instance', () => {
    let component = new DrawboardComponent(service, parametersStatus);
=======
  let parameterService = new ParametersStatusService();
  it('should create an instance', () => {
    let component = new DrawboardComponent(service, parameterService);
>>>>>>> a89763c6df0e2f8ede8e98f841a1a2f8fe53291d
    expect(component).toBeTruthy();
  });
});
