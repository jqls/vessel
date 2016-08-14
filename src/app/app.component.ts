import {Component} from '@angular/core';
import {DrawboardComponent} from "./drawboard/drawboard.component";
import {ToolboxComponent} from "./toolbox/toolbox.component";
import {DrawboardStatusService} from "./drawboard-status.service";


@Component({
  moduleId: module.id,
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.css'],
  providers: [
    DrawboardStatusService
  ],
  directives: [
    DrawboardComponent,
    ToolboxComponent
  ]
})
export class AppComponent {
  title = 'It works well!';
}
