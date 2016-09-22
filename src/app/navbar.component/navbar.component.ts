import {Component, OnInit} from "@angular/core";
import {NavbarService} from "../navbar.service";
import {Router} from "@angular/router";

@Component({
  // moduleId: module.id,
  selector: 'app-navbar',
  templateUrl: 'navbar.component.html',
  styleUrls: ['navbar.component.css']
})
export class NavbarComponent implements OnInit {

  // private chartsList:{id:number,name:string}[] = [];
  constructor(private navbarService: NavbarService,private router: Router) {
  }

  get navbarTitle(): string {
    return this.navbarService.title;
  }
  // gotoChart(chart): void{
  //   let link = ['/craft-dataAnalysis', chart.id];
  //   this.router.navigate(link);
  // }
  ngOnInit() {
    // 取消data-analys任务
    // this.chartsList = [
    //   {id: 1, name: 'Bar'},
    //   {id: 2, name: 'Pie'}
    // ];
    // for(let chart of this.chartsList){
    //   console.log(chart.id);
    //   console.log(chart.name);
    // }

  }

}
