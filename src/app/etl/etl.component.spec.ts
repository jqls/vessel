/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { EtlComponent } from './etl.component';

describe('EtlComponent', () => {
  let component: EtlComponent;
  let fixture: ComponentFixture<EtlComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EtlComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EtlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
