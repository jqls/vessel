import {Component, OnInit} from "@angular/core";
import {NavbarService} from "../navbar.service";

@Component({
  // moduleId: module.id,
  selector: 'app-navbar',
  templateUrl: 'navbar.component.html',
  styleUrls: ['navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private navbarService: NavbarService) {
  }

  get navbarTitle(): string {
    return this.navbarService.title;
  }

  ngOnInit() {
  }

}
