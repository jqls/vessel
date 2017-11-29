/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { QuestionControlService } from './question-control.service';

describe('Service: QuestionControl', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [QuestionControlService]
    });
  });

  it('should ...', inject([QuestionControlService], (service: QuestionControlService) => {
    expect(service).toBeTruthy();
  }));
});
