import {Injectable} from "@angular/core";


@Injectable()
export class SubmitService {

  constructor() {
  }

  submit(workflowJSON: string) {
    console.log(`submit: ${workflowJSON}`);
  }

}
