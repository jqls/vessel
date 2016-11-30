import {Injectable} from '@angular/core';
import {QuestionBase, TextboxQuestion, DropdownQuestion} from "./questions";
import {FormControl, Validators, FormGroup} from "@angular/forms";
import {ParameterType} from "../json-types";
import {mydebug} from "../my-log";

@Injectable()
export class QuestionControlService {
private debug_location: string = "QuestionControlService";
  constructor() {
  }

  toQuestions(parameters: ParameterType[]): QuestionBase<any>[] {
    let questions: QuestionBase<any>[] = [];
    parameters.forEach((parameter: ParameterType) => {
      mydebug(this.debug_location,"toQuestions",parameter.key);
      mydebug(this.debug_location,"toQuestions",parameter.controlType);
      //todo:根据parameters的controltyoe构造对应Question类型,可根据需要添加
      questions.push(
        parameter.controlType == "dropdown" ? new DropdownQuestion(parameter) :
        parameter.controlType == "textbox" ? new TextboxQuestion(parameter) :
          null
      );

    });
    return questions.sort((a, b) => a.order - b.order);
  }

  toFormGroup(questions: QuestionBase<any>[]) {
    let group: any = {};
    // todo:需要的话加入password类型的表单
    // let isPasswdQuestion: boolean = false;
    questions.forEach(question => {
      mydebug(this.debug_location,"toQuestions",question.key);
      // if (question.controlType == "password")
      //   isPasswdQuestion = true;
      group[question.key] = question.required ? new FormControl(question.value || '', Validators.required)
        : new FormControl(question.value || '');
    });
    // return isPasswdQuestion ? new FormGroup(group, this.passwordMatchValidator) : new FormGroup(group);
    return new FormGroup(group);
  }

  // passwordMatchValidator(g: FormGroup) {
  //   return g.get('password').value === g.get('passwordConfirm').value
  //     ? null : {'mismatch': true};
  // }
}
