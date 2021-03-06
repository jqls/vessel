import { Injectable } from "@angular/core";
import {
  QuestionBase,
  TextboxQuestion,
  SelectQuestion,
  FilelistQuestion,
  DatabaseQuestion,
  MultiSelectQuestion, DirListQuestion
} from "./questions";
import { FormControl, Validators, FormGroup } from "@angular/forms";
import { ParameterType } from "../json-types";
import { mydebug } from "../my-log";

@Injectable()
export class QuestionControlService {
  private debug_location: string = "QuestionControlService";

  constructor() {
  }

  toQuestions(parameters: ParameterType[]): QuestionBase<any>[] {
    let questions: QuestionBase<any>[] = [];
    parameters.forEach((parameter: ParameterType) => {
      mydebug(this.debug_location, "toQuestions", parameter.description);
      mydebug(this.debug_location, "toQuestions", parameter.controlType);
      //todo:根据parameters的controltyoe构造对应Question类型,可根据需要添加
      questions.push(
        parameter.description == "columnlist" ? new MultiSelectQuestion(parameter) :
          parameter.controlType == "selection" ? new SelectQuestion(parameter) :
            parameter.controlType == "text" ? new TextboxQuestion(parameter) :
              parameter.controlType == "filelist" ? new FilelistQuestion(parameter) :
                parameter.controlType == "database" ? new DatabaseQuestion(parameter) :
                  parameter.controlType == "directorylist"? new DirListQuestion(parameter) :
                    null
      );

    });
    return questions.sort((a, b) => {
      return a.order - b.order
    });
  }

  toFormGroup(questions: QuestionBase<any>[]) {
    let group: any = {};
    // todo:需要的话加入password类型的表单
    // let isPasswdQuestion: boolean = false;
    questions.forEach(question => {
      mydebug(this.debug_location, "toQuestions", question.key);
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
