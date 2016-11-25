/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { DrawboardComponent } from './drawboard.component';

describe('DrawboardComponent', () => {
  let component: DrawboardComponent;
  let fixture: ComponentFixture<DrawboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DrawboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DrawboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
