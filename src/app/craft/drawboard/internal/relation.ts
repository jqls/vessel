import {DrawboardComponent} from "../drawboard.component";
import {WorkflowNode, ELEMENT_WIDTH, ELEMENT_HEIGHT} from "./node-basic";
import {Contextmenu} from "./contextmenu";
import {mydebug} from "../../../share/my-log";
import {OutputType, InputType} from "../../../share/json-types";
export class Relation {
  private debug_location: string = "Relation";
  static idCount = 0;
  id: number;
  board: DrawboardComponent;
  from: WorkflowNode;
  from_port: OutputType;
  to: WorkflowNode;
  to_port: InputType;
  menu: Contextmenu;
  path: any;
  constructor(board: DrawboardComponent, from: WorkflowNode, to: WorkflowNode,from_port: OutputType, to_port: InputType) {
    this.board = board;
    this.from = from;
    this.from_port = from_port;
    this.to = to;
    this.to_port = to_port;

    this.id = Relation.idCount;
    mydebug(this.debug_location, "constructor", 'id:idCount = ' + this.id + ':' + Relation.idCount);
    Relation.idCount += 1;

    this.path = board.relationLayer.append('path');
    this.path.classed('path', true)
      .style('marker-end', 'url(#mark-end-arrow)');
    this.initMenu();
    this.bindEventHandler();
    console.log(this);
    this.update();
  }

  private initMenu(): void {
    this.menu = new Contextmenu();
    this.menu.addItem("删除", this.deleteRelation());
    this.menu.addMenuTo(this);
  }

  private bindEventHandler(): void {
    let self = this;
    this.path
      .on("mousedown", () => {
        self.mousedownHandler();
      });
  }

  private mousedownHandler() {
    mydebug(this.debug_location, "mousedownHandler", 'begin');
    this.board.setSelectedRelation(this);
  }

  update() {
    this.path.attr('d', this.getCurveAttribute()).attr("fill", "none").style("stroke", "gray").style("stroke-width", "2.5px");
  }

  private getCurveAttribute(): string {
    let fromPosition = this.getFromPosition();
    let from = 'M' + fromPosition.x + " " + fromPosition.y;
    let toPosition = this.getToPosition();
    //return from +'Q'+fromPosition.x+(fromPosition.y+toPosition.y)/2+',' +(fromPosition.x+toPosition.x)/2+(fromPosition.y+toPosition.y)/2+'T' + toPosition.x + toPosition.y;
    //return from +'Q'+(fromPosition.x+toPosition.x)/2+(fromPosition.y+30)+ toPosition.x  + toPosition.y;
    return from + 'C' + fromPosition.x + " " + ((fromPosition.y + toPosition.y) / 2 - 2) + ',' + ((fromPosition.x + toPosition.x) / 2 + 2) + " " + (fromPosition.y + toPosition.y) / 2 + ',' + (fromPosition.x + toPosition.x) / 2 + " " + (fromPosition.y + toPosition.y) / 2 + 'S' + toPosition.x + " " + ((fromPosition.y + toPosition.y) / 2 + 2) + ',' + toPosition.x + " " + toPosition.y;
  }

  private getFromPosition(): {x: number, y: number} {
    return {
      'x': this.from.cx + this.from_port.cx,
      'y': this.from.cy + this.from_port.cy
    };
  }

  private getToPosition(): {x: number, y: number} {
    return {
      'x': this.to.cx + this.to_port.cx,
      'y': this.to.cy + this.to_port.cy
    };
  }

  deleteRelation(): ()=>void {
    let self = this;
    return ()=>{
      mydebug(this.debug_location,"deleteRelation","begin");
      self.from.relations.filter((fromRelation:Relation)=>{
        return !(self.id == fromRelation.id);
      });
      self.to.relations.filter((toRelation:Relation)=>{
        return !(self.id == toRelation.id);
      });
      self.board.relations.filter((boardRelation:Relation)=>{
        return !(self.id == boardRelation.id);
      });

      self.menu.remove();
      self.path.remove();
      self.board.setSelectedRelation(null);
    }
  }
  delete():void {
    this.menu.remove();
    this.path.remove();
  }
}
