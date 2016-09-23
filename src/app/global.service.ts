import { Injectable } from '@angular/core';

@Injectable()
export class GlobalService {
  private lastFlowID: number;
  private lastID: number;
  constructor() { }
  setLastFLowID(flowid: number){
    this.lastFlowID = flowid;
  }
  getLastFLowID(){
    return this.lastFlowID;
  }
  setLastID(id: number){
    this.lastID = id;
  }
  getLastID(){
    return this.lastID;
  }
}
