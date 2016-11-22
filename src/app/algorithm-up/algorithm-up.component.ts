import { Component, Input} from "@angular/core";
import {NgForm} from '@angular/forms';
// import { NavbarService } from "../navbar.service";
// import { Router } from "@angular/router";
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
     {"count":this.n,"label":null,"vals":null,"types":null,"tags":null,"description":null},
     //{"count":1,"label":"ee","vals":"ee","types":"ee","tags":"ee","description":"ee"},
     //{"count":2,"label":"zhai","vals":"zha","types":"zhli","tags":"zoli","description":"aoli"},
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
  this.parameterList.push({"count":this.n,"label":this.parameterList[this.n-2].label,"vals":this.parameterList[this.n-2].vals,
  "types":this.parameterList[this.n-2].types,"tags":this.parameterList[this.n-2].tags,
  "description":this.parameterList[this.n-2].description});
   //this.parameterList.push({"count":this.n-1,"label":null,"vals":null,"types":null,"tags":null,"description":null})
    //   console.log(this.parameters[this.n-2].label);
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
}