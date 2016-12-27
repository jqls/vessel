import './rxjs-extensions';

import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';

// Imports for loading & configuring the in-memory web api
  //import {InMemoryWebApiModule} from 'angular2-in-memory-web-api';
  //import {InMemoryDataService}  from './in-memory-data.service';

import {AppComponent} from './app.component';
import {AppRoutingModule} from "./app-routing.module";
import {CraftModule} from "./craft/craft.module";
import {GlobalService} from "./global.service";
import {DataService} from "./data.service";
import {QuestionControlService} from "./share/dynamic-form/question-control.service";
import {DynamicFormModule} from "./share/dynamic-form/dynamic-form.module";
import {NavpaneComponent} from './navpane/navpane.component';
import {NavbarComponent} from './navbar/navbar.component';
import {DrawerComponent} from './drawer/drawer.component';
import {ETLModule} from "./etl/etl.module";
import {UploadModule} from "./upload/upload.module";
import {DataAnalysisComponent} from './data-analysis.unit/data-analysis.component';
import {DataShowModule} from "./share/data-show/data-show.module";

@NgModule({
  imports: [
   //InMemoryWebApiModule.forRoot(InMemoryDataService),

    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    AppRoutingModule,
    CraftModule,
    DynamicFormModule,
    ETLModule,
    UploadModule,
    DataShowModule
  ],
  declarations: [
    AppComponent,
    NavpaneComponent,
    NavbarComponent,
    DrawerComponent,
    DataAnalysisComponent,
  ],
  providers: [
    GlobalService,
    DataService,
    QuestionControlService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
