import { Injectable } from '@angular/core';
import {mydebug} from "./share/my-log";

@Injectable()
export class GlobalService {
  private debug_location: string = "GlobalService";
  //todo:好像暂时不需要
  // private da_subscribers: Array<(active: boolean)=>void>;
  private navepane_subscribers: Array<(stat: boolean)=>void>;
  private navepaneStat: boolean;
  constructor() {
    this.navepane_subscribers = Array<(stat: boolean)=>void>();
    // this.da_subscribers = Array<(active: boolean)=>void>();
  }
  bookNavpaneStat(update: (stat: boolean)=>void): void {
    mydebug(this.debug_location, "bookNavpaneStat", 'book');
    this.navepane_subscribers.push(update);
  }
  setNavpaneStat(stat: boolean): void{
    this.navepane_subscribers.forEach(fn=>fn(stat));
  }

  // bookDrawerStat(update: (active: boolean)=>void): void {
  //   mydebug(this.debug_location, "bookSelectedNodeType", 'book');
  //   this.da_subscribers.push(update);
  // }
  // setDrawerStat(active: boolean): void{
  //   this.da_subscribers.forEach(fn=>fn(active));
  // }
}
