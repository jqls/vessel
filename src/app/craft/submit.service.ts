import {Injectable} from "@angular/core";
import {Workflow} from "../shared/json-typedef";


@Injectable()
export class SubmitService {

  constructor() {
  }

  submit(workflow: Workflow) {
    console.log("submitted.");
    console.log(JSON.stringify(workflow));
  }

}
