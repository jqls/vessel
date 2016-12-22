import {Component, OnInit, ViewChild} from '@angular/core';
import { TreeComponent} from 'angular2-tree-component';
import { Http } from "@angular/http";
import { AlgorithmPara,Parameters,InputParameters,OutputParameters} from "../algorithmPara";
import {treeNode} from "../algorithmPara";
export type ParaJSON = {
  //算法上传时 POST的参数后把responce返回的参数解析成json格式获取ID
  algorithmID:string
};

@Component({
  selector: 'app-upload-algorithm',
  templateUrl: './upload-algorithm.component.html',
  styleUrls: ['./upload-algorithm.component.sass']
})
export class UploadAlgorithmComponent implements OnInit {
  paraJSON: ParaJSON;
  n = 1;
  submitted = true;
  algorithmPara = new AlgorithmPara();
  formData = new FormData();
  public nodes: treeNode[] = [];
 //  nodes = [
 //      {
 //          id: 1,
 //          name: 'root1',
 //          isHidden:false,
 //          children: [
 //              { id: 2, name: 'child1' ,isHidden:false,children:[]},
 //              { id: 3, name: 'child2' ,isHidden:false,children:[]},
 //              { id: 8, name: 'child3' ,isHidden:true,children:[]},
 //          ]
 //      },
 //      {
 //          id: 4,
 //          name: 'root2',
 //          isHidden:false,
 //          children: [
 //              { id: 5, name: 'child2.1' ,isHidden:false,children:[]},
 //              {
 //                  id: 6,
 //                  name: 'child2.2',
 //                  isHidden:false,
 //                  children: [
 //                      { id: 7, name: 'subsub',isHidden:true,children:[]}
 //                  ]
 //              }
 //          ]
 //      }
 //  ];
  inputParameters: InputParameters[] = [{"name": "", "dataType": ""}];
  outputParameters: OutputParameters[] = [{"name": "", "dataType": ""}];
  parameterList: Parameters[] = [{"label": "", "parameterType": "", "description": ""}];
  nodePath: number[] = [];
  @ViewChild(TreeComponent)
  private tree: TreeComponent;

  constructor(private http: Http) {
    console.log("algorithm-up");
    this.getData();
  }

  ngOnInit() {
  }

  get diagnostic() {
    this.algorithmPara.parameters = this.parameterList;
    this.algorithmPara.inputs = this.inputParameters;
    this.algorithmPara.outputs = this.outputParameters;
    return JSON.stringify(this.algorithmPara);
  }

  changeListener(event): void {
    this.postFile(event.target);
  }

  postFile(inputValue: any): void {//获取文件
    this.formData.append("file", inputValue.files[0]);
    console.log(this.formData);
  }

  private handleError(error: any) {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }

  addPara() {
    this.n++;
    this.parameterList.push({"label": "", "parameterType": "", "description": ""});
    for (let i = this.n - 1; i >= 0; i--) {
      console.log(this.parameterList[i].label + "**" + this.parameterList[i].parameterType);
    }
  }

  addInputPara() {
    this.inputParameters.push({"name": "", "dataType": ""});
  }

  addOutputPara() {
    this.outputParameters.push({"name": "", "dataType": ""});
  }

  onEvent = ($event) => {//获取树状结构所选的值
    this.submitted = true;
    var nameList = '';
    this.nodePath = $event.node.path;
    for (let i = this.nodePath.length - 1; i >= 0; i--) {
      let nodeName = this.tree.treeModel.getNodeById(this.nodePath[i]);
      if (i == this.nodePath.length - 1) {
        nameList = nodeName.data.name + nameList;
      }
      else {
        nameList = nodeName.data.name + ">" + nameList;
      }
    }
    this.algorithmPara.category = nameList;

  }

  treeShow() {
    this.submitted = false;
  }

  getData() {//获取数据
    let dataUrl = "http://10.5.0.222:8080/workflow/category/";
    return this.http.get(dataUrl).toPromise().then(response => {
      this.nodes.push(response.json());
      this.tree.treeModel.update();
      console.log(response.json())
    })
      .catch(this.handleError);
  }

  sendFile() {
    var URL_File = `http://10.5.0.222:8080/workflow/processor/${this.diagnostic}/`;
    console.log(URL_File);
    var xhr = new XMLHttpRequest();
    xhr.open("POST", URL_File, true);
    xhr.send(this.formData);
    console.log(this.formData);
    xhr.onload = function (e) {
      if (this.status == 200) {
        alert(this.responseText);
      }
    }

  }
}
