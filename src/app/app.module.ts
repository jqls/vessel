import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

// Imports for loading & configuring the in-memory web api
import { InMemoryWebApiModule } from 'angular2-in-memory-web-api';
import { InMemoryDataService }  from './in-memory-data.service';

import { AppComponent } from './app.component';
import { AppRoutingModule } from "./app-routing.module";
import { CraftModule } from "./craft/craft.module";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    InMemoryWebApiModule.forRoot(InMemoryDataService),

    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,
    CraftModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
