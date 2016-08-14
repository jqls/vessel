/* tslint:disable:no-unused-variable */

import {By}           from '@angular/platform-browser';
import {DebugElement} from '@angular/core';
import {addProviders, async, inject} from '@angular/core/testing';
import {DrawboardComponent} from './drawboard.component';
import {DrawboardStatusService} from "../drawboard-status.service";

describe('Component: Drawboard', () => {
  let service = new DrawboardStatusService();

  it('should create an instance', () => {
    let component = new DrawboardComponent(service);
    expect(component).toBeTruthy();
  });
});
