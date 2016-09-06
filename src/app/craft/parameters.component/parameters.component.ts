import {Component, OnInit} from "@angular/core";
import {ParametersStatusService} from "../parameters-status.service";
import {FormGroup} from "@angular/forms";
import {DrawboardElement} from "../drawboard.component/internal/drawboard.element";
import {DataSourceNode, ProcessNode, WorkflowNode} from "../drawboard.component/internal/drawboard.node";

@Component({
    moduleId: module.id,
    selector: 'app-parameters',
    templateUrl: 'parameters.component.html',
    styleUrls: ['parameters.component.css'],
})
export class ParametersComponent implements OnInit {

    open: boolean;
    openedNode: WorkflowNode;
    form: FormGroup;

    constructor(private parametersStatus: ParametersStatusService) {
        this.open = false;
        parametersStatus.bookService((node: WorkflowNode): void=> {
            this.open = (node != null);
            this.openedNode = node;
            if (node != null)
                this.form = parametersStatus.toFormGroup();
        });
    }

    onSubmit() {
        //todo: 更新参数
        console.log("update parameters");
        this.parametersStatus.updatePatameters(this.form);
    }

    ngOnInit() {

    }

}
