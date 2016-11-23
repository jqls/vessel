/* tslint:disable:no-unused-variable */

//noinspection TypeScriptCheckImport
import { addProviders, async, inject } from '@angular/core/testing';
import { NavbarService } from './navbar.service';

describe('Service: Navbar', () => {
  beforeEach(() => {
    addProviders([NavbarService]);
  });

  it('should ...',
    inject([NavbarService],
      (service: NavbarService) => {
        expect(service).toBeTruthy();
      }));
});
