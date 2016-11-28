import { Injectable } from '@angular/core';
import {mydebug} from "./share/my-log";

@Injectable()
export class GlobalService {
  private debug_location: string = "GlobalService";
  //todo:好像暂时不需要
  // private da_subscribers: Array<(active: boolean)=>void>;

  constructor() {
    // this.da_subscribers = Array<(active: boolean)=>void>();
  }
  // bookDrawerStat(update: (active: boolean)=>void): void {
  //   mydebug(this.debug_location, "bookSelectedNodeType", 'book');
  //   this.da_subscribers.push(update);
  // }
  // setDrawerStat(active: boolean): void{
  //   this.da_subscribers.forEach(fn=>fn(active));
  // }
}
