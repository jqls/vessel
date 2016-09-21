import {Component, OnInit} from "@angular/core";
import {NavbarService} from "../navbar.service";
import {ParametersStatusService} from "./parameters-status.service";
import {ProcessService} from "./process.service";
import {DrawboardStatusService} from "./drawboard-status.service";
import {SubmitService} from "./submit.service";
import {ResultService} from "./result.service";
@Component({
    selector: 'app-craft',
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
    mytype: number;

    constructor(private privateNavbarService: NavbarService,
                private drawboardStatus: DrawboardStatusService) {
        drawboardStatus.setType(0);
    }

    ngOnInit() {
    }

    ifNeedShowParameter(): boolean {
        return this.privateNavbarService.showParameterBox;
    }

    showParametersBtnClick() {
        this.privateNavbarService.showParameterBox = !this.privateNavbarService.showParameterBox;
    }

    onSubmitClick() {
        this.drawboardStatus.onSubmitClick();
    }
}
