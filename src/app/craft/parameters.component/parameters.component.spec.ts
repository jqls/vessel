/* tslint:disable:no-unused-variable */

import {ParametersComponent} from "./parameters.component";
import {ParametersStatusService} from "../parameters-status.service";

describe('Component: Parameters', () => {

  let parameterStatus = new ParametersStatusService();

  it('should create an instance', () => {
    let component = new ParametersComponent(parameterStatus);
    expect(component).toBeTruthy();
  });
});
