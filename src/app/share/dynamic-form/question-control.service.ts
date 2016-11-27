import {Injectable} from '@angular/core';
import {QuestionBase} from "./questions";
import {FormControl, Validators, FormGroup} from "@angular/forms";
import {ParameterType} from "../json-types";

@Injectable()
export class QuestionControlService {

  constructor() {
  }

  toQuestions(parameters: ParameterType[]): QuestionBase<any>[] {
    let questions: QuestionBase<any>[] = [];
    parameters.forEach((parameter: ParameterType) => {
      //todo:根据parameters的controltyoe构造对应Question类型

    });
    return questions;
  }

  toFormGroup(questions: QuestionBase<any>[]) {
    let group: any = {};
    let isPasswdQuestion: boolean = false;
    questions.forEach(question => {
      if (question.controlType == "password")
        isPasswdQuestion = true;
      group[question.key] = question.required ? new FormControl(question.value || '', Validators.required)
        : new FormControl(question.value || '');
    });
    return isPasswdQuestion ? new FormGroup(group, this.passwordMatchValidator) : new FormGroup(group);
  }

  passwordMatchValidator(g: FormGroup) {
    return g.get('password').value === g.get('passwordConfirm').value
      ? null : {'mismatch': true};
  }
}
