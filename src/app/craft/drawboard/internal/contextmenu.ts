import * as d3 from "d3"
import {BasicDrawboardNode} from "./node-basic";
import {Relation} from "./relation";

/**
 * 成员变量
 * menuNode：menu所在DIV标签
 * menuBodyNode：menu所在UL标签
 * obj：要添加菜单的对象
 */
export class Contextmenu {
  menuNode: any;
  menuBodyNode: any;
  obj: any;

  constructor() {
    this.menuNode = document.createElement("div");
    this.menuBodyNode = document.createElement("ul");
  }

  /*
   * addItem方法给右键菜单添加功能项。
   */
  addItem(itemText: string, event: ()=>void): any {
    let menuItem = document.createElement("li");
    menuItem.innerHTML = itemText;
    d3.select(menuItem)
      .classed("list-group-item", true)
      .classed("menu-item", true);

    menuItem.onmouseover = function () {
      console.log("menuItem.onmouseover");
      d3.select(menuItem).classed("active", true);
    };

    menuItem.onmouseout = function () {
      console.log("menuItem.onmouseout");
      d3.select(menuItem).classed("active", false);
    };

    menuItem.onmousedown = function () {
      console.log("menuItem.onclick");
      event();
    };

    this.menuBodyNode.appendChild(menuItem);
  };

  /**
   * addMenuTo方法将该右键菜单应用到指定的元素。一个参数。
   * obj : 应用该右键菜单的元素
   */
  addMenuTo(obj: any): void {

    this.obj = obj;

    let objNode;

    //根据类型进行赋值
    if (obj instanceof BasicDrawboardNode) {
      objNode = obj.groupContainer.node();
    } else if (obj instanceof Relation) {
      objNode = obj.path.node();
    }


    let menuBody = this.menuBodyNode;
    let menu = this.menuNode;
    /* 设置ul的类属性 */
    d3.select(menuBody).classed("list-group", true).classed("menu-body", true);

    /*设置div的类属性*/
    d3.select(menu).attr('class', "menu");

    menu.appendChild(menuBody);
    document.body.appendChild(menu);

    //向目标添加事件响应
    objNode.onblur = function () {
      d3.select(menu).style({'display': "none"});
    };
    objNode.oncontextmenu = function (ev) {
      d3.select(menu).style({
        'display': "block",
        'top': ev.pageY + 'px',
        'left': ev.pageX + 'px'
      });
      return false;
    }
  }

  remove(): void {
    d3.select(this.menuNode).remove();
  }
  //仅用于向Output添加按钮
  addClickMenu(obj: any){
    this.obj = obj;

    let objNode;

    objNode = obj.node();


    let menuBody = this.menuBodyNode;
    let menu = this.menuNode;
    /* 设置ul的类属性 */
    d3.select(menuBody).classed("list-group", true).classed("menu-body", true);

    /*设置div的类属性*/
    d3.select(menu).attr('class', "menu");

    menu.appendChild(menuBody);
    document.body.appendChild(menu);

    //向目标添加事件响应
    objNode.onblur = function () {
      d3.select(menu).style({'display': "none"});
    };
    objNode.onclick = function (ev) {
      d3.select(menu).style({
        'display': "block",
        'top': ev.pageY + 'px',
        'left': ev.pageX + 'px'
      });
      return false;
    }
  }

}
