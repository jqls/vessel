import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {UploadComponent} from './upload.component';
import {UploadRoutingModule} from "./upload.routing.module";
import {UploadAlgorithmComponent} from './upload-algorithm/upload-algorithm.component';
import {UploadDatasetComponent} from './upload-dataset/upload-dataset.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpModule} from "@angular/http";
import { UploadManagementComponent } from './upload-management/upload-management.component';
import {TreeModule} from "angular2-tree-component";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    UploadRoutingModule,
    TreeModule,
  ],
  declarations: [
    UploadComponent,
    UploadAlgorithmComponent,
    UploadDatasetComponent,
    UploadManagementComponent
  ],
  exports:[
    UploadComponent
  ]
})
export class UploadModule {
}
