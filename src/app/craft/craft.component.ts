import {Component, OnInit} from "@angular/core";
import {NavbarService} from "../navbar.service";
import {DrawboardComponent} from "./drawboard.component/drawboard.component";
import {InputsComponent} from "./inputs.component/inputs.component";
import {ParametersComponent} from "./parameters.component/parameters.component";
import {ToolboxComponent} from "./toolbox.component/toolbox.component";
import {REACTIVE_FORM_DIRECTIVES, FORM_DIRECTIVES} from "@angular/forms";
import {ParametersStatusService} from "./parameters-status.service";
import {ProcessService} from "./process.service";
import {DrawboardStatusService} from "./drawboard-status.service";
import {SubmitService} from "./submit.service";
import {ResultComponent} from "./result.component/result.component"
import {ResultService} from "./result.service";
@Component({
  moduleId: module.id,
  selector: 'app-craft',
  directives: [
    DrawboardComponent,
    InputsComponent,
    ParametersComponent,
    ToolboxComponent,
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
  templateUrl: 'craft.component.html',
  styleUrls: ['craft.component.css']
})
export class CraftComponent implements OnInit {

  constructor(private privateNavbarService: NavbarService,
              private drawboardStatus: DrawboardStatusService) {
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
