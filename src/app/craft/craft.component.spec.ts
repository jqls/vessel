/* tslint:disable:no-unused-variable */

import {CraftComponent} from "./craft.component";
import {NavbarService} from "../navbar.service";
import {DrawboardStatusService} from "./drawboard-status.service";

describe('Component: Craft', () => {
  let navbarService = new NavbarService();
  let drawboardStatusService = new DrawboardStatusService();
  it('should create an instance', () => {
    let component = new CraftComponent(navbarService, drawboardStatusService);
    expect(component).toBeTruthy();
  });
});
