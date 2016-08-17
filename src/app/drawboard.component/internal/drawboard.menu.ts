import {DrawboardElement} from "./drawboard.element";
import {Relation} from "./drawboard.relation";
/**
 * Created by qwk on 16-8-15.
 **********************************
 * 成员变量menu
 */

export class Menu {
    menu:any;
    menuBody:any;
    obj:any;

    constructor() {
        this.menu = document.createElement("div");
        this.menuBody = document.createElement("ul");
        // d3.select(this.menu).style({'visibility' : 'visible'});
    }

    getselecter():any {
        console.log("getselecter");
        console.log(this.menu);
        console.log(d3.select(this.menu));
        return d3.select(this.menu);
    }

    /*
     * addItem方法给右键菜单添加功能项。
     */
    addItem(itemText:string, event:any):any {
        let subItem = document.createElement("li");
        let menu = this.menu;
        console.log("addItem");
        // console.log(this.obj);
        let self = this;
        subItem.innerHTML = itemText;
        d3.select(subItem)
            .classed("list-group-item", true)
            .classed("menu-item", true);

        subItem.onmouseover = function () {
            console.log("onmouseover");
            d3.select(subItem).classed("active", true);
        };

        subItem.onmouseout = function () {
            console.log("onmouseout");
            d3.select(subItem).classed("active", false);
        };
        subItem.onmousedown = function () {
            console.log("subItem.onclick");
            event();
            //return false;
        };
        // console.log(subItem);
        this.menuBody.appendChild(subItem);
    };

    /**
     * addMenuTo方法将该右键菜单应用到指定的元素。一个参数。
     * obj : 应用该右键菜单的元素
     */
    addMenuTo(obj:any):void {
        /*设置ul的样式*/
        this.obj = obj;

        let nodeElement;

        if(obj instanceof DrawboardElement){
            nodeElement = obj.groupContainer.node();
        } else if(obj instanceof Relation){
            nodeElement = obj.path.node();
        }

        console.log("addMenuTo");
        // console.log(this.obj);
        let menubody = this.menuBody;
        /* 配合外部样式表，控制样式 */
        d3.select(menubody).classed("list-group", true).classed("menu-body", true);

        /*设置div的样式*/
        d3.select(this.menu).attr('class', "menu");

        this.menu.appendChild(this.menuBody);
        document.body.appendChild(this.menu);
        /*由于在事件函数内，this指代的对象不再是本类的对象，
         * 所以为以下函数定义一个全局变量menu
         */
        let menu = this.menu;

        nodeElement.onblur = function () {
            d3.select(menu).style({'display': "none"});
        };
        nodeElement.oncontextmenu = function (ev) {
            console.log("oncontextmenu");
            d3.select(menu).style({
                'display': "block",
                'top': ev.pageY + 'px',
                'left': ev.pageX + 'px'
            });
            return false;
        }
    }
}
