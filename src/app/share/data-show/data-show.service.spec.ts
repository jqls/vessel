/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { DataShowService } from './data-show.service';

describe('Service: DataShow', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DataShowService]
    });
  });

  it('should ...', inject([DataShowService], (service: DataShowService) => {
    expect(service).toBeTruthy();
  }));
});
