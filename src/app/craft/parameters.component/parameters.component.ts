import {Component, OnInit} from "@angular/core";
import {ParametersStatusService} from "../parameters-status.service";
import {FormGroup} from "@angular/forms";
import {DrawboardElement} from "../drawboard.component/internal/drawboard.element";
import {DataSourceNode, ProcessNode, WorkflowNode} from "../drawboard.component/internal/drawboard.node";
import {ProcessNodeTypeJSON, ProcessNodeType} from "../drawboard.component/internal/drawboard.node-types";
import {RelationAttribute} from "./relation-attribute";
import {Relation} from "../drawboard.component/internal/drawboard.relation";

@Component({
    // moduleId: module.id,
    selector: 'app-parameters',
    templateUrl: 'parameters.component.html',
    styleUrls: ['parameters.component.css'],
})
export class ParametersComponent implements OnInit {
    isRelation: boolean;
    open: boolean;
    openedNode;//: WorkflowNode;
    form: FormGroup;

    //用于storm
    groupiongOption: string[] = ["shuffleGrouping","fieldsGrouping"];
    relationAttr: RelationAttribute = new RelationAttribute("shuffleGrouping","");

    constructor(private parametersStatus: ParametersStatusService) {
        this.open = false;
        this.isRelation = false;
        parametersStatus.bookService((node): void=> {
            this.open = (node != null);
            this.openedNode = node;
            if (node != null)
            {
                this.isRelation = false;
                if(!(node instanceof Relation))
                    this.form = parametersStatus.toFormGroup();
                else
                    this.isRelation = true;
                console.log("isRelation"+this.isRelation);

            }

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
