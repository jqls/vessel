import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {UploadComponent} from './upload.component';
import {UploadRoutingModule} from "./upload.routing.module";
import {UploadAlgorithmComponent} from './upload-algorithm/upload-algorithm.component';
import {UploadDatasetComponent} from './upload-dataset/upload-dataset.component';

@NgModule({
  imports: [
    CommonModule,
    UploadRoutingModule
  ],
  declarations: [
    UploadComponent,
    UploadAlgorithmComponent,
    UploadDatasetComponent
  ]
})
export class UploadModule {
}
