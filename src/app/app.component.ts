import {Component} from "@angular/core";
import {NavbarService} from "./navbar.service";
import {NavbarComponent} from "./navbar.component/navbar.component";
import {CraftComponent} from "./craft/craft.component";
import {Http, HTTP_PROVIDERS} from "@angular/http";
import './rxjs-extensions';

@Component({
  moduleId: module.id,
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.css'],
  providers: [
    NavbarService,
  ],
  directives: [
    NavbarComponent,
    CraftComponent
  ]
})
export class AppComponent {

  title = "Vessel";

  constructor() {
  }

}
