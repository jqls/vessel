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

  constructor() {
    console.log("----------------0--------------------------");
  }

  ngOnInit() {
    console.log("----------------1--------------------------");
  }
  get isValid() { return this.form.controls[this.question.key].valid; }

  // printV(item: string){
  //   console.log("--------------------------"+item+"---------------------");
  //   console.log(this.question.value);
  //   this.question.value=item;
  //   console.log(this.question.value);
  // }
  checkValue(ele){
    let value='';
    for(let i=0;i<ele.length;i++){
      if(ele.options[i].selected){
        console.log(ele.options[i].value);
        console.log(ele.options[i].value.split('\''));
        value+=ele.options[i].value.split('\'')[1]+",";
      }
    }
    value = value.slice(0,-1);
    console.log(value);
    console.log(ele.id);
    console.log(this.form.value[ele.id]);
    this.form.value[ele.id] = value;
  }
}
