import {QuestionControlService} from "./question-control.service";
import {DynamicFormQuestionComponent} from "./dynamic-form-question.component";
import {ReactiveFormsModule, FormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";
import {NgModule} from "@angular/core";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  declarations: [
    DynamicFormQuestionComponent
  ],
  providers: [
    QuestionControlService
  ],
  exports: [
    DynamicFormQuestionComponent
  ]
})
export class DynamicFormModule { }
