import { Component, OnInit, Input, HostListener, Output, EventEmitter } from '@angular/core';
import { QuestionBase } from "./questions";
import { FormGroup } from "@angular/forms";
import { Http, Headers, RequestMethod } from "@angular/http";

@Component({
  selector: 'app-df-question',
  templateUrl: './dynamic-form-question.component.html',
  styleUrls: ['./dynamic-form-question.component.sass']
})
export class DynamicFormQuestionComponent implements OnInit {
  private shiftHeld: boolean;
  private lastItem = -1;
  private showModal = false;
  private data_url = "http://10.5.0.223:8081/workflow/get_directory_info/";
  private dir_data;
  private select_info: string[];

  @Input() question: QuestionBase<any>;
  @Input() form: FormGroup;
  @Output() change: EventEmitter<number> = new EventEmitter<number>();

  onClick(path = "/") {
    if (path.endsWith("/..")) {
      let sa = path.split('/');
      console.log(sa);
      sa.pop();
      sa.pop();
      path = sa.join('/');
      if (sa.length <= 1)
        path = "/";
      console.log(path);
    }
    let headers = new Headers({
      'Content-Type': 'application/json'
    });
    let json = JSON.stringify({
      ac_id: 2,
      parent_dir: path
    });
    console.log(json);
    this.http.post(this.data_url, json, {headers: headers, method: RequestMethod.Post})
      .toPromise()
      .then((res) => {
        this.showModal = true;
        console.log(res.json());
        this.dir_data = res.json();

        for (let i in this.dir_data.dir)
          this.dir_data.dir[i].index = i;
      })
  }

  onClose() {
    this.showModal = false;
    console.log(this.select_info)
  }

  onSave() {
    this.showModal = false;
    this.select_info = this.dir_data.dir.filter(_ => _.selected).map(_ => this.dir_data.prefix + '/' + _.name);
    this.question.value = this.select_info.join(",");
    this.form.value[this.question.key] = this.question.value;
    this.change.emit(1);
    console.log(this.question.value)
  }

  @HostListener('window:click', ['$event'])
  clickCheckShift(ev: any) {
    this.shiftHeld = ev.shiftKey;
  }

  checkboxChange(item, event) {
    console.log(item);
    console.log(event);
    if (this.shiftHeld && this.lastItem != -1) {
      let lastChecked = !!this.dir_data.dir[this.lastItem].selected;
      let start, end;
      if (this.lastItem < item.index) {
        start = this.lastItem;
        end = item.index;
      } else {
        start = item.index;
        end = this.lastItem;
      }
      for (let i = start; i <= end; i++) {
        this.dir_data.dir[i].selected = lastChecked
      }
    }
    this.lastItem = item.index;
  }

  constructor(private http: Http) {
    console.log("----------------0--------------------------");
  }

  ngOnInit() {
    console.log("----------------1--------------------------");
  }

  get isValid() {
    return this.form.controls[this.question.key].valid;
  }

  // printV(item: string){
  //   console.log("--------------------------"+item+"---------------------");
  //   console.log(this.question.value);
  //   this.question.value=item;
  //   console.log(this.question.value);
  // }
  checkValue(ele) {
    let value = '';
    for (let i = 0; i < ele.length; i++) {
      if (ele.options[i].selected) {
        console.log(ele.options[i].value);
        console.log(ele.options[i].value.split('\''));
        value += ele.options[i].value.split('\'')[1] + ",";
      }
    }
    value = value.slice(0, -1);
    console.log(value);
    console.log(ele.id);
    console.log(this.form.value[ele.id]);
    this.form.value[ele.id] = value;
  }

}
