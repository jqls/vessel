/* tslint:disable:no-unused-variable */

import {CraftComponent} from "./craft.component";
import {NavbarService} from "../navbar.service";
import {SubmitService} from "./submit.service";

describe('Component: Craft', () => {
  let navbarService = new NavbarService();
  let submitService = new SubmitService();
  it('should create an instance', () => {
    let component = new CraftComponent(navbarService, submitService);
    expect(component).toBeTruthy();
  });
});
