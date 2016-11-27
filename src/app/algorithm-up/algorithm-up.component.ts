;
import {Component, Input} from "@angular/core";
import { Headers, Http, RequestMethod } from "@angular/http";
import { AlgorithmPara,Parameters} from "./algorithmPara";
import { ParaJSON } from "../craft/data-show/data-types"
@Component({
  selector: 'app-algorithm',
  templateUrl: 'algorithm-up.component.html',
  styleUrls: ['algorithm-up.component.css']
})




export class AlgorithmComponent {

    paraJSON:ParaJSON;
   n=1;
  algorithmPara = new AlgorithmPara();
  
  formData = new FormData();

  //dong tai can shu list
   parameterList:Parameters[]=[
     {"count":this.n,"label":null,"type":"int","val":"1111a","tags":"input类型","description":"111a"},
     //{"count":1,"label":"ee","val":"ee","type":"ee","tags":"ee","description":"ee"},
     //{"count":2,"label":"zhai","val":"zha","type":"zhli","tags":"zoli","description":"aoli"},
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
  //this.parameters.push({"count":this.n,"label":"zhaoli","val":"zhaoli","type":"zhaoli","tags":"zhaoli","description":"zhaoli"});
  // this.parameterList.push({"count":this.n,"label":this.parameterList[this.n-2].label,"val":this.parameterList[this.n-2].val,
  // "type":this.parameterList[this.n-2].type,"tags":this.parameterList[this.n-2].tags,
  // "description":this.parameterList[this.n-2].description});
   this.parameterList.push({"count":this.n,"label":null,"type":null,"val":null,"tags":null,"description":null});
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

    private tree = [
    {
        text: "Parent 1",
        nodes: [
            {
                text: "Child 1",
                nodes: [
                    {
                        text: "Grandchild 1"
                    },
                    {
                        text: "Grandchild 2"
                    }
                ]
            },
            {
                text: "Child 2"
            }
        ]
    },
    {
        text: "Parent 2"
    },
    {
        text: "Parent 3"
    },
    {
        text: "Parent 4"
    },
    {
        text: "Parent 5"
    }
];
  getTree() {


}

}