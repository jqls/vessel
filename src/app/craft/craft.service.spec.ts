/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { CraftService } from './craft.service';

describe('Service: Craft', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CraftService]
    });
  });

  it('should ...', inject([CraftService], (service: CraftService) => {
    expect(service).toBeTruthy();
  }));
});
