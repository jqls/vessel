import {Component, OnInit, ViewChild} from "@angular/core";
import {TreeComponent} from "angular2-tree-component";
import {Http} from "@angular/http";
import {AlgorithmPara, treeNode} from "../algorithmPara";
import {GlobalService} from "../../global.service";
import {environment} from "../../../environments/environment";
export type ParaJSON = {
  //算法上传时 POST的参数后把responce返回的参数解析成json格式获取ID
  algorithmID: string
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
  nodeName: string;//保存树节点名字
  algorithmPara = new AlgorithmPara();
  formData = new FormData();
  show: boolean = false;
  public nodes: treeNode[] = [];
  // nodes = [//测试用数据
  //     {
  //         id: 1,
  //         name: 'root1',
  //         isHidden:false,
  //         children: [
  //             { id: 2, name: 'child1' ,isHidden:false,children:[]},
  //             { id: 3, name: 'child2' ,isHidden:false,children:[]},
  //             { id: 8, name: 'child3' ,isHidden:true,children:[]},
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
  //                     { id: 7, name: 'subsub',isHidden:true,children:[]}
  //                 ]
  //             }
  //         ]
  //     }
  // ];
  //inputParameters: InputParameters[] = [{"name": "", "dataType": ""}];
  //outputParameters: OutputParameters[] = [{"name": "", "dataType": ""}];
  // parameterList: Parameters[] = [{"label": "", "parameterType": "", "description": ""}];
  nodePath: number[] = [];
  @ViewChild(TreeComponent)
  private tree: TreeComponent;

  constructor(private http: Http, private globalService: GlobalService) {
    console.log("algorithm-up");
    this.getData();
    this.globalService.isVisual = true;
  }

  ngOnInit() {
  }

  get diagnostic() {
    //this.algorithmPara.parameters = this.parameterList;
    //this.algorithmPara.inputs = this.inputParameters;
    //this.algorithmPara.outputs = this.outputParameters;
    return JSON.stringify(this.algorithmPara);
  }

  changeListener(event): void {
    this.postFile(event.target);
    if (event.target.value != null) {
      this.show = true;
    }
  }

  postFile(inputValue: any): void {//获取文件
    this.formData.append("file", inputValue.files[0]);
    console.log(this.formData);
  }

  private handleError(error: any) {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }

  // addPara() {
  //   this.n++;
  //   this.parameterList.push({"label": "", "parameterType": "", "description": ""});
  //   for (let i = this.n - 1; i >= 0; i--) {
  //     console.log(this.parameterList[i].label + "**" + this.parameterList[i].parameterType);
  //   }
  // }
  //
  // addInputPara() {
  //   this.inputParameters.push({"name": "", "dataType": ""});
  // }
  //
  // addOutputPara() {
  //   this.outputParameters.push({"name": "", "dataType": ""});
  // }

  onEvent = ($event) => {//获取树状结构所选的值
    this.submitted = true;
    var nameList = '';
    this.nodeName = '';
    this.nodePath = $event.node.path;
    for (let i = this.nodePath.length - 1; i >= 0; i--) {
      let nodeName = this.tree.treeModel.getNodeById(this.nodePath[i]);
      if (i == this.nodePath.length - 1) {
        nameList = nodeName.data.id + nameList;//绑定到数组，传递id到后台
        this.nodeName = nodeName.data.name + this.nodeName;//只绑定到前端显示
      }
      else {
        nameList = nodeName.data.id + ">" + nameList;
        this.nodeName = nodeName.data.name + ">" + this.nodeName;
      }
    }
    this.algorithmPara.category = nameList;

  }

  treeShow() {
    this.submitted = false;
  }

  getData() {//获取数据
    console.log("up-algo getdata()")
    let dataUrl = environment.URL_Upload_getdata;
    return this.http.get(dataUrl).toPromise().then(response => {
      this.nodes.push(response.json());
      this.tree.treeModel.update();
      console.log(response.json())
    })
      .catch(this.handleError);
  }

  sendFile() {
    var URL_File = environment.URL_Upload_File + `${this.diagnostic}/`;
    console.log(URL_File);
    var xhr = new XMLHttpRequest();
    xhr.open("POST", URL_File, true);
    xhr.send(this.formData);
    console.log(this.formData);
    xhr.onload = ()=> {
      if (xhr.status == 200) {
        alert(xhr.responseText);
        this.show = false;
      }
    }
  }


  // inputSelect(value:string,index:number){//把selection数据转换成数组格式
  //   var inputArray:string[]=value.split(",");
  //   this.parameterList[index].choices=inputArray;
  //   console.log(index);
  //   console.log(inputArray);
  // }
}
