/* tslint:disable:no-unused-variable */

import {By}           from '@angular/platform-browser';
import {DebugElement} from '@angular/core';
import {addProviders, async, inject} from '@angular/core/testing';
import {ToolboxComponent} from './toolbox.component';
import {DrawboardStatusService} from "../drawboard-status.service";

describe('Component: Toolbox', () => {
  let service:DrawboardStatusService = new DrawboardStatusService();

  it('should create an instance', () => {
    let component = new ToolboxComponent(service);
    expect(component).toBeTruthy();
  });
});
