import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule, JsonpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

//import outside packages
import { InMemoryWebApiModule } from 'angular2-in-memory-web-api';
import {SelectModule} from 'angular2-select';

import { AppRoutingModule } from './app-routing.module';
import { NavigatorRoutingModule } from './navigator/navigator-routing.module';

//import my components
import { ServerData } from './service/in-memory-data.service';
import { AppComponent } from './app.component';
import { NavigatorComponent } from './navigator/navigator.component';
import { TaskListComponent } from './navigator/tasklist/tasklist.component';
import { InputFormComponent } from './navigator/newtask/input-form.component';
import { HdfsComponent } from './navigator/newtask/hdfs/hdfs.component';
import { HiveComponent } from './navigator/newtask/hive/hive.component';


@NgModule({
  declarations: [
    AppComponent,
    InputFormComponent,
    NavigatorComponent,
    TaskListComponent,
    HdfsComponent,
    HiveComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    JsonpModule,
    InMemoryWebApiModule.forRoot(ServerData),
    SelectModule,
    AppRoutingModule,
    NavigatorRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
