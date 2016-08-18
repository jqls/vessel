/**
 * Created by tang on 2016/8/18.
 */

import { BrowserModule } from "@angular/platform-browser";
import { ReactiveFormsModule } from "@angular/forms"
import {NgModule} from "@angular/core";

import {AppComponent} from "./app.component";

@NgModule({
  imports: [
    BrowserModule,
    ReactiveFormsModule
  ],
  declarations: [AppComponent],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor() {
  }
}
