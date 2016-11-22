/* tslint:disable:no-unused-variable */

import { addProviders, async, inject } from '@angular/core/testing';
import { SubmitService } from './submit.service';

describe('Service: Submit', () => {
  beforeEach(() => {
    addProviders([SubmitService]);
  });

  it('should ...',
    inject([SubmitService],
      (service: SubmitService) => {
        expect(service).toBeTruthy();
      }));
});
