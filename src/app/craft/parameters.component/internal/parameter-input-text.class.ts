import {ParameterInputBase} from "./parameter-input-base.class";
import {ParameterJSON} from "../../drawboard.component/internal/drawboard.node-types";
/**
 * Created by tang on 2016/8/18.
 */

export class ParameterInputText extends ParameterInputBase<string> {

  constructor(parameter: ParameterJSON) {
    super(parameter);
  }
}
