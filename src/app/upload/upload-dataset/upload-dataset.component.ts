import { Component, OnInit } from '@angular/core';
import { GlobalService } from "../../global.service";

@Component({
  selector: 'app-upload-dataset',
  templateUrl: './upload-dataset.component.html',
  styleUrls: ['./upload-dataset.component.sass']
})
export class UploadDatasetComponent implements OnInit {

  formData = new FormData();
  private fileinfo={"name":""};
  constructor(private globalService: GlobalService) {
    this.globalService.isVisual = true;
  }

  ngOnInit() {
  }

  changeListener(event): void {
    this.postFile(event.target);
  }

  postFile(inputValue: any): void {//获取文件
    this.formData.append("document", inputValue.files[0]);
    console.log(inputValue.files[0]);
    console.log(this.formData);
  }
  sendFile() {
    var URL_File = +JSON.stringify(this.fileinfo)+"/";
    console.log(URL_File);
    var xhr = new XMLHttpRequest();
    xhr.open("POST", URL_File, true);
    xhr.send(this.formData);
    console.log(this.formData);
    xhr.onload = ()=> {
      if (xhr.status == 200) {
        alert(xhr.responseText);
      }
    }
  }

}
