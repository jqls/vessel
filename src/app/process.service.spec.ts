/* tslint:disable:no-unused-variable */

import { addProviders, async, inject } from '@angular/core/testing';
import { ProcessService } from './process.service';

describe('Service: Process', () => {
  beforeEach(() => {
    addProviders([ProcessService]);
  });

  it('should ...',
    inject([ProcessService],
      (service: ProcessService) => {
        expect(service).toBeTruthy();
      }));
});
