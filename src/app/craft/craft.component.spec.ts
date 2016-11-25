/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { CraftComponent } from './craft.component';

describe('CraftComponent', () => {
  let component: CraftComponent;
  let fixture: ComponentFixture<CraftComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CraftComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CraftComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
