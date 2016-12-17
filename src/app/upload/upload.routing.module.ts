import {RouterModule} from "@angular/router";
import {NgModule} from "@angular/core";
import {UploadAlgorithmComponent} from "./upload-algorithm/upload-algorithm.component";
import {UploadDatasetComponent} from "./upload-dataset/upload-dataset.component";
import {UploadManagementComponent} from "./upload-management/upload-management.component";
@NgModule({
  imports: [
    RouterModule.forChild([

      {
        path: 'upload-algotithm',
        component: UploadAlgorithmComponent
      },
      {
        path: 'upload-dataset',
        component: UploadDatasetComponent
      },
      {
        path: 'upload-management',
        component: UploadManagementComponent
      }

    ]),
  ],
  exports: [
    RouterModule
  ]
})
export class UploadRoutingModule {
}
