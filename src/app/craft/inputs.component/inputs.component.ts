import {Component, Input} from "@angular/core";
import {FormGroup} from "@angular/forms";
import {ParameterJSON} from "../drawboard.component/internal/drawboard.node-types";

@Component({
    // moduleId: module.id,
    selector: 'app-inputs',
    templateUrl: 'inputs.component.html',
    styleUrls: ['inputs.component.css']
})
export class InputsComponent {

    @Input() parameter: ParameterJSON;
    @Input() form: FormGroup;

    get isValid() {
        return this.form.controls[this.parameter.label].valid;
    }

}
