import {Injectable} from "@angular/core";
import {User} from "./shared/user.class";

@Injectable()
export class NavbarService {

  currentUser: User;
  showParameterBox = true;

  constructor() {
  }

}
