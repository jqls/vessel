import {Component} from "@angular/core";
import {NavbarService} from "./navbar.service";

@Component({
    selector: 'app-root',
    templateUrl: 'app.component.html',
    styleUrls: ['app.component.css'],
    providers: [
        NavbarService,
    ]
})
export class AppComponent {

    title = "Vessel";

    constructor() {
    }

}
