import {Component, OnInit} from '@angular/core';
import { Http, Response } from '@angular/http';
import {NgForm} from '@angular/forms';
import * as io from 'socket.io-client';
import {Observable} from 'rxjs/Observable';
import 'rxjs/Rx';

@Component({
    selector: 'navigator',
    templateUrl: './navigator.component.html',
    styleUrls: [ './navigator.component.css' ]
})
export class NavigatorComponent implements OnInit{

    ngOnInit(){

    }
}