/* tslint:disable:no-unused-variable */

import {CraftComponent} from "./craft.component";
import {NavbarService} from "../navbar.service";

describe('Component: Craft', () => {
  let navbarService = new NavbarService();
  it('should create an instance', () => {
    let component = new CraftComponent(navbarService);
    expect(component).toBeTruthy();
  });
});
