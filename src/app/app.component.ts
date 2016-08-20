import {Component} from "@angular/core";
import {DrawboardComponent} from "./drawboard.component/drawboard.component";
import {ToolboxComponent} from "./toolbox.component/toolbox.component";
import {DrawboardStatusService} from "./drawboard-status.service";
import {ProcessService} from "./process.service";
import {ParametersStatusService} from "./parameters-status.service";
import {ParametersComponent} from "./parameters.component/parameters.component";
import {InputsComponent} from "./inputs.component/inputs.component";
import {FORM_DIRECTIVES, REACTIVE_FORM_DIRECTIVES} from "@angular/forms";
import {NavbarService} from "./navbar.service";


@Component({
  moduleId: module.id,
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.css'],
  providers: [
    DrawboardStatusService,
    ProcessService,
    ParametersStatusService,
    NavbarService
  ],
  directives: [
    FORM_DIRECTIVES,
    REACTIVE_FORM_DIRECTIVES,
    DrawboardComponent,
    ToolboxComponent,
    ParametersComponent,
    InputsComponent
  ]
})
export class AppComponent {
  title = 'Vessel';

  constructor(private privateNavbarService: NavbarService) {
  }

  ifNeedShowParameter(): boolean {
    return this.privateNavbarService.showParameterBox;
  }

  showParametersBtnClick() {
    this.privateNavbarService.showParameterBox = !this.privateNavbarService.showParameterBox;
  }

}
