/* tslint:disable:no-unused-variable */

import { addProviders, async, inject } from '@angular/core/testing';
import { ParametersStatusService } from './parameters-status.service';

describe('Service: ParametersStatus', () => {
  beforeEach(() => {
    addProviders([ParametersStatusService]);
  });

  it('should ...',
    inject([ParametersStatusService],
      (service: ParametersStatusService) => {
        expect(service).toBeTruthy();
      }));
});
