/**
 * Created by zhaoli on 16-12-5.
 */
import {  TreeComponent,TreeNode, TREE_ACTIONS, KEYS, IActionMapping} from 'angular2-tree-component';
import {Component, ViewChild,OnInit} from '@angular/core';
import { Headers, Http, RequestMethod } from "@angular/http";
import { Modal } from 'angular2-modal';

import {treeNode} from "../algorithmPara"
import * as _ from 'lodash';
//import * as d3 from "d3";
//import tree = d3.layout.tree;
//import {TreeComponent} from "angular2-tree-component/dist/lib/components/tree.component";
const actionMapping:IActionMapping = {
    mouse: {
        // // dblClick: (tree, node, $event) =>{
        // //     $("#nameId").val(node.data.name);
        // //     console.log(node.data.name);
        // },
         click: TREE_ACTIONS.TOGGLE_SELECTED,


    },
    // keys: {
    //     [KEYS.ENTER]: (tree, node, $event) =>
    //         alert(`This is ${node.data.name}`)
    // }
}
@Component({
    selector:'app-algorithmManagement',
    templateUrl: 'algorithm-management.component.html',
    styleUrls: ['algorithm-management.component.css']
})
export class AlgorithmManagement implements OnInit{

    public nodeName:string;
    public nodeIsHidden:boolean=false;
    public nodes:treeNode[]=[{ id: 8, name: 'child3' ,Hidden:false,children:[]}];
    public nodeToAdd;//add node parameter
    nodeId=2;
    public  dataUrl="http://10.5.0.222:8080/workflow/category/";
    //public isShow:boolean=true;//模态框是否显示
    constructor(private http: Http) {
        this.getData();
    }
    ngOnInit(){
        console.log("OnInit");
    }
    // nodes = [
    //     {
    //         id: 1,
    //         name: 'root1',
    //         isHidden:false,
    //         children: [
    //             { id: 2, name: 'child1' ,isHidden:false,children:[]},
    //             { id: 3, name: 'child2' ,isHidden:false,children:[]},
    //             { id: 8, name: 'child3' ,isHidden:false,children:[]},
    //         ]
    //     },
    //     {
    //         id: 4,
    //         name: 'root2',
    //         isHidden:false,
    //         children: [
    //             { id: 5, name: 'child2.1' ,isHidden:false,children:[]},
    //             {
    //                 id: 6,
    //                 name: 'child2.2',
    //                 isHidden:false,
    //                 children: [
    //                     { id: 7, name: 'subsub',isHidden:false,children:[]}
    //                 ]
    //             }
    //         ]
    //     }
    // ];

    @ViewChild(TreeComponent)
    private tree :TreeComponent;

    treeOptions = {
        actionMapping,
    }
    onEvent = ($event) => {
        // this.isShow=false;
        // console.log("onEvent");
        // let value=$event.node.data.name;
        // $("#nameId").val(value);

    }
    save(){//add node save function
        if($("#nameId").val()==='') {
            alert("名称不能为空！！！");
        }
        else {
            this.nodeToAdd.data.children.push(
                {id: this.nodeId, name: this.nodeName, Hidden: this.nodeIsHidden, children: []});
            console.log(this.nodeId);
            this.nodeId++;
            this.tree.treeModel.update();
            //this.isShow = true;
            this.sendData();
            //$('#myModal').modal('hide');//model待完善


        }
    }

    cancel(){ //add node form cancel function
        //this.isShow=true;
    }

    addNode(id:any){
        $("#nameId").val("");//set input is null
        //this.isShow=false;
        this.nodeToAdd=this.tree.treeModel.getNodeById(id);
       // console.log(this.nodeToAdd);
        // for(var i=0;i<5;i++)//test data--delete
        // {
        //     console.log(nodeToAdd.children[i].id);
        //     console.log(nodeToAdd.children[i].data.name);
        //
        // }
    }
    remove(id:any){ //remove node
        console.log(id);
        let nodeToDelete=this.tree.treeModel.getNodeById(id);
        if(nodeToDelete.hasChildren){
            alert("该节点有子节点不能删除！！！");
        }
        else {
            if(nodeToDelete.isRoot){
                alert("此乃根节点不能删除！！！");
            }
            else{
                this.removeNode(nodeToDelete);
                this.tree.treeModel.update();
                this.sendData();
            }


            //this.sendDeleteNode(nodeToDelete);
        }
    }

    selected(){

        if ($("input:radio:checked").val()=="是"){
            this.nodeIsHidden=false;
            console.log("yes");
        }
        else {
            this.nodeIsHidden=true;
            console.log("no")
        }
    }

    getData(){//获取数据
        return this.http.get(this.dataUrl).toPromise().then(response=>{
            this.nodes.push(response.json());
            this.tree.treeModel.update();
            console.log("getData");
            console.log(this.nodes);

        })
        .catch(this.handleError);
    }
    sendData(){//发送数据
        let headers = new Headers({'Content-Type': 'application/json'});
        console.log("senddata");
        console.log(this.nodes);
        return this.http.post(this.dataUrl,this.nodes,{ headers: headers, method: RequestMethod.Post }).toPromise()
            .then(response => {
                console.log(response);
                return (response.json());})
            .catch(this.handleError);
    }
    private handleError(error: any) {
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    }
    removeNode(node: TreeNode) {//点击删除按钮删除节点
        let parentNode = node.realParent
            ? node.realParent
            : node.treeModel.virtualRoot;

        _.remove(parentNode.data.children, function(child) {
            return child === node.data;
        });
    }

    sendDeleteNode(node:TreeNode){//只传送删除的节点
        console.log(node);
        let deleteUrl="";
        let headers = new Headers({'Content-Type': 'application/json'});;
        return this.http.post(deleteUrl,node,{ headers: headers, method: RequestMethod.Post }).toPromise()
            .then(response => {
                console.log(response);
                return (response.json());})
            .catch(this.handleError);

    }

}
