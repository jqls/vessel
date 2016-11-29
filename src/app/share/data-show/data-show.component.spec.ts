/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { DataShowComponent } from './data-show.component';

describe('DataShowComponent', () => {
  let component: DataShowComponent;
  let fixture: ComponentFixture<DataShowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DataShowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DataShowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
