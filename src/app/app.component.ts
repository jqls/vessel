import {Component} from "@angular/core";
import {DrawboardComponent} from "./drawboard.component/drawboard.component";
import {ToolboxComponent} from "./toolbox.component/toolbox.component";
import {DrawboardStatusService} from "./drawboard-status.service";
import {ProcessService} from "./process.service";
import {ParametersStatusService} from "./parameters-status.service";
import {ParametersComponent} from "./parameters.component/parameters.component";
import {InputsComponent} from "./inputs.component/inputs.component";
import {FORM_DIRECTIVES, REACTIVE_FORM_DIRECTIVES} from "@angular/forms";


@Component({
  moduleId: module.id,
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.css'],
  providers: [
    DrawboardStatusService,
    ProcessService,
    ParametersStatusService
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
  title = 'Works!';
  showParameters = false;

  showParametersBtnClick() {
    this.showParameters = !this.showParameters;
  }

}
