/* tslint:disable:no-unused-variable */

import { addProviders, async, inject } from '@angular/core/testing';
import { DrawboardStatusService } from './drawboard-status.service';

describe('Service: DrawboardStatus', () => {
  beforeEach(() => {
    addProviders([DrawboardStatusService]);
  });

  it('should ...',
    inject([DrawboardStatusService],
      (service: DrawboardStatusService) => {
        expect(service).toBeTruthy();
      }));
});
