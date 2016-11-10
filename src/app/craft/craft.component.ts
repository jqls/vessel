import {Component, OnInit} from "@angular/core";
import {NavbarService} from "../navbar.service";
import {ParametersStatusService} from "./parameters-status.service";
import {ProcessService} from "./process.service";
import {DrawboardStatusService} from "./drawboard-status.service";
import {SubmitService} from "./submit.service";
import {ResultService} from "./result.service";
import {ActivatedRoute, Params} from "@angular/router";
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
    private editMode = false;
    private taskName: string = "新建任务";
    private isReload: boolean = false;
    constructor(private privateNavbarService: NavbarService,
                private drawboardStatus: DrawboardStatusService,
                private route: ActivatedRoute) {
    }

    ngOnInit() {
        this.drawboardStatus.setType(0);
        this.route.params.forEach((params: Params) => {
            this.taskName = params['taskName'] || "新建任务";
            this.isReload = params['type'] == "reload"? true : false;
            this.drawboardStatus.setTaskName(this.taskName);
            console.log("---------带参数的");
            console.log(this.taskName);
            console.log(this.isReload);
        });
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
