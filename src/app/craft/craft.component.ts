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
    styleUrls: ['craft.component.scss']
})
export class CraftComponent implements OnInit {
    mytype: number;
    private editMode = false;
    private taskName:string;
    constructor(private privateNavbarService: NavbarService,
                private drawboardStatus: DrawboardStatusService) {
        this.taskName = "新建任务";
    }

    ngOnInit() {
        this.drawboardStatus.setType(0);
    }
    click(){
        this.editMode = true;
    }
    rename(newName:string){
        this.taskName = newName;
        this.editMode = false;
        this.drawboardStatus.setTaskName(this.taskName);
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
