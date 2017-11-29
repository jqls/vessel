/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { NavpaneComponent } from './navpane.component';

describe('NavpaneComponent', () => {
  let component: NavpaneComponent;
  let fixture: ComponentFixture<NavpaneComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NavpaneComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavpaneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
