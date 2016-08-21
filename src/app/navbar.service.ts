import {Injectable} from "@angular/core";
import {User} from "./shared/user.class";

@Injectable()
export class NavbarService {

  currentUser: User;
  showParameterBox = true;
  title = "Vessel";

  setTitle(title: string) {
    this.title = title;
  };

  constructor() {
  }

}
