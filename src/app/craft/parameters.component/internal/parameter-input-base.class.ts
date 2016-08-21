import {ParameterJSON} from "../../../shared/json-typedef";
/**
 * Created by tang on 2016/8/18.
 */


export class ParameterInputBase<T> {

  parameter: ParameterJSON;

  constructor(parameter: ParameterJSON) {
    this.parameter = parameter;
  }
}
