import {Component} from '@angular/core';
import {DrawboardComponent} from "./drawboard/drawboard.component";
import {ToolboxComponent} from "./toolbox/toolbox.component";


@Component({
  moduleId: module.id,
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.css'],
  directives: [
    DrawboardComponent,
    ToolboxComponent
  ]
})
export class AppComponent {
  title = 'It works well!';
}
