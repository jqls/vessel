import { TREE_ACTIONS, KEYS, IActionMapping } from 'angular2-tree-component';
import {Component} from "@angular/core";
import { Headers, Http, RequestMethod } from "@angular/http";
import { AlgorithmPara,Parameters} from "./algorithmPara";
import { ParaJSON } from "../craft/data-show/data-types";

const actionMapping:IActionMapping = {
    mouse: {
        click: TREE_ACTIONS.TOGGLE_SELECTED
    },
    keys: {
        [KEYS.ENTER]: (tree, node, $event) =>
            alert(`This is ${node.data.name}`)
    }
}

@Component({
  selector: 'app-algorithm',
  templateUrl: 'algorithm-up.component.html',
  styleUrls: ['algorithm-up.component.css']
})

export class AlgorithmComponent {
    paraJSON:ParaJSON;
    n=1;
    submitted = true;
    algorithmPara = new AlgorithmPara();
    formData = new FormData();
  //dong tai can shu list
   parameterList:Parameters[]=[
     {"label":null,"type":null,"val":null,"tags":null,"description":null},

     ];

  constructor(private http: Http) {
  }
   get diagnostic() {

   this.algorithmPara.parameters = this.parameterList;
    return JSON.stringify(this.algorithmPara);
  }

  changeListener(event): void {
    this.postFile(event.target);
  }
  postFile(inputValue: any): void {
    this.formData.append("fname", inputValue.files[0]);
    console.log(this.formData);
  }

// getType(value:string){
//       this.parameterList[this.n-1].type=value;
//       console.log("vaule-input:"+value);
//
// }





    onSubmit() {
    var URL_Parameter = "http://10.5.0.222:8080/uploadalgorithm/";
    let headers = new Headers({
      //'Content-Type': 'application/json'
      'Content-Type': 'undefined'
    });
   
    console.log('this.diagnostic'+this.diagnostic);
    return this.http
      .post(URL_Parameter, this.diagnostic, { headers: headers, method: RequestMethod.Post })
      .toPromise()
      .then(
      response => {
        console.log(response);
        return (response.json() as ParaJSON);
      }).catch(this.handleError);
  }

  private handleError(error: any) {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }
  submit(){
     //console.log("f.value"+f.value);
     this.onSubmit().then((response: ParaJSON) => {
      this.paraJSON = response;
      console.log(this.paraJSON.algorithmID);
      this.planB(this.paraJSON.algorithmID)
    }).catch(this.handleError);

  }

  addPara() {
      this.n++;

   this.parameterList.push({"label":null,"type":null,"val":null,"tags":null,"description":null});
   for(let i=this.n-1;i>=0;i--) {
       console.log(this.parameterList[i].label + "**" + this.parameterList[i].tags + "**" + this.parameterList[i].description
           + "**" + this.parameterList[i].val+ "**" + this.parameterList[i].type );
   }
    }

  planB(id: string) {//可以传文件
    var URL_File = `http://10.5.0.222:8080/uploadalgorithmfile/${id}/`;
    console.log(URL_File);
    var xhr = new XMLHttpRequest();
    xhr.open("POST", URL_File, true);
    xhr.send(this.formData);
    xhr.onload = function (e) {
      if (this.status == 200) {
        alert(this.responseText);
      }
    }


  }
    nodes = [
        {
            id: 1,
            name: 'root1',
            children: [
                { id: 2, name: 'child1' },
                { id: 3, name: 'child2' }
            ]
        },
        {
            id: 4,
            name: 'root2',
            children: [
                { id: 5, name: 'child2.1' },
                {
                    id: 6,
                    name: 'child2.2',
                    children: [
                        { id: 7, name: 'subsub' }
                    ]
                }
            ]
        }
    ];

    onEvent = ($event) => {//获取树状结构所选的值
    this.algorithmPara.tags=$event.node.data.name;
    this.submitted=true;
    console.log(this.algorithmPara.tags);
}
    treeOptions = {
        actionMapping
    }


    treeShow(){
        this.submitted=false;}

    // treeHide(){
    //     this.submitted=true;
    // }
    // private treeUrl = 'app/algorithm-up/treeData';
    // getTree(): Promise<TreeData[]> {
    //     return this.http.get(this.treeUrl)
    //         .toPromise()
    //         .then(response => response.json().data as TreeData[])
    //         .catch(this.handleError);
    // }


}