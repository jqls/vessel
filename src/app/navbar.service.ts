import {Injectable} from "@angular/core";

@Injectable()
export class NavbarService {

  showParameterBox = true;
  title = "Vessel";

  setTitle(title: string) {
    this.title = title;
  };

  constructor() {
  }

}
