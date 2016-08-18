/**
 * Created by tang on 2016/8/18.
 */

import {BrowserModule} from "@angular/platform-browser";
import {ReactiveFormsModule} from "@angular/forms";
import {NgModule} from "@angular/core";
import {AppComponent} from "./app.component";
import {InputsComponent} from "./inputs.component/inputs.component";
import {ParametersComponent} from "./parameters.component/parameters.component";
import {DrawboardComponent} from "./drawboard.component/drawboard.component";
import {ToolboxComponent} from "./toolbox.component/toolbox.component";

@NgModule({
  imports: [
    BrowserModule,
    ReactiveFormsModule
  ],
  declarations: [
    AppComponent,
    ParametersComponent,
    DrawboardComponent,
    ToolboxComponent,
    InputsComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor() {
  }
}
