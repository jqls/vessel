import {Component, OnInit} from "@angular/core";
import {NavbarService} from "../navbar.service";
import {DrawboardComponent} from "./drawboard.component/drawboard.component";
import {InputsComponent} from "./inputs.component/inputs.component";
import {ParametersComponent} from "./parameters.component/parameters.component";
import {ToolboxMapreduceComponent} from "./toolbox.component/toolbox-mapreduce.component";
import {REACTIVE_FORM_DIRECTIVES, FORM_DIRECTIVES} from "@angular/forms";
import {ParametersStatusService} from "./parameters-status.service";
import {ProcessService} from "./process.service";
import {DrawboardStatusService} from "./drawboard-status.service";
import {SubmitService} from "./submit.service";
import {ResultComponent} from "./result.component/result.component"
import {ResultService} from "./result.service";
@Component({
  moduleId: module.id,
  selector: 'app-craft-mapreduce',
  directives: [
    DrawboardComponent,
    InputsComponent,
    ParametersComponent,
    ToolboxMapreduceComponent,
    ResultComponent,
    FORM_DIRECTIVES,
    REACTIVE_FORM_DIRECTIVES,
  ],
  providers: [
    DrawboardStatusService,
    ProcessService,
    ParametersStatusService,
    SubmitService,
    ResultService
  ],
  templateUrl: 'craft-mapreduce.component.html',
  styleUrls: ['craft-mapreduce.component.css']
})
export class CraftMapreduceComponent implements OnInit {

  mytype = 1;
  constructor(private privateNavbarService: NavbarService,
              private drawboardStatus: DrawboardStatusService) {
    drawboardStatus.setType(1);
  }

  ngOnInit() {
  }

  ifNeedShowParameter(): boolean {
    return this.privateNavbarService.showParameterBox;
  }

  showParametersBtnClick() {
    this.privateNavbarService.showParameterBox = !this.privateNavbarService.showParameterBox;
  }

  onSubmitClick(){
    this.drawboardStatus.onSubmitClick();
  }
}