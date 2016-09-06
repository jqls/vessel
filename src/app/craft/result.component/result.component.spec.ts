/* tslint:disable:no-unused-variable */

import { By }           from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { addProviders, async, inject } from '@angular/core/testing';
import { ResultComponent } from './result.component';
import {ResultService} from "../result.service";

describe('Component: Result', () => {
  let resultService = new ResultService();
  it('should create an instance', () => {
    let component = new ResultComponent(resultService);
    expect(component).toBeTruthy();
  });
});
