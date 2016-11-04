import {Component, OnInit} from '@angular/core';
import {Params, ActivatedRoute} from "@angular/router";
import {DataService} from "./data.service";

@Component({
    selector: 'app-data-show',
    templateUrl: './data-show.component.html',
    styleUrls: ['./data-show.component.css'],
    providers: [
        DataService
    ]
})
export class DataShowComponent implements OnInit {

    type: number = null;

    constructor(private route: ActivatedRoute,
                private dataService: DataService) {
    }

    ngOnInit() {
        // this.route.params.forEach((params: Params) => {
        //     let id = +params['id'];
        //     this.type = id;
        //     console.log("charts typr is " + this.type);
        // });
    }
    setType(type:number){
        this.type = type;
        console.log("show:"+this.type);
    }
}
