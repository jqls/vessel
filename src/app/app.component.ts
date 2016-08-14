import {Component} from '@angular/core';
import {DrawboardComponent} from "./drawboard.component/drawboard.component";
import {ToolboxComponent} from "./toolbox.component/toolbox.component";
import {DrawboardStatusService} from "./drawboard-status.service";
import {ProcessService} from "./process.service";


@Component({
  moduleId: module.id,
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.css'],
  providers: [
    DrawboardStatusService,
    ProcessService
  ],
  directives: [
    DrawboardComponent,
    ToolboxComponent
  ]
})
export class AppComponent {
  title = 'Works!';
}
