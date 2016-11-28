import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {UploadComponent} from './upload.component';
import {UploadRoutingModule} from "./upload.routing.module";
import {UploadAlgorithmComponent} from './upload-algorithm/upload-algorithm.component';
import {UploadDatasetComponent} from './upload-dataset/upload-dataset.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpModule} from "@angular/http";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    UploadRoutingModule
  ],
  declarations: [
    UploadComponent,
    UploadAlgorithmComponent,
    UploadDatasetComponent
  ],
  exports:[
    UploadComponent
  ]
})
export class UploadModule {
}
