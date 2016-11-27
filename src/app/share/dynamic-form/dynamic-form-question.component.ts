import {Component, OnInit, Input} from '@angular/core';
import {QuestionBase} from "./questions";
import {FormGroup} from "@angular/forms";

@Component({
  selector: 'app-df-question',
  templateUrl: './dynamic-form-question.component.html',
  styleUrls: ['./dynamic-form-question.component.sass']
})
export class DynamicFormQuestionComponent implements OnInit {

  @Input() question: QuestionBase<any>;
  @Input() form: FormGroup;

  constructor() { }

  ngOnInit() {
  }
  get isValid() { return this.form.controls[this.question.key].valid; }

}
