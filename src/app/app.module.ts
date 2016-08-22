/**
 * Created by tang on 2016/8/18.
 */

import {BrowserModule} from "@angular/platform-browser";
import {ReactiveFormsModule} from "@angular/forms";
import {NgModule} from "@angular/core";
import {AppComponent} from "./app.component";
import {routing, appRoutingProvider} from "./app.routing";
import {CraftComponent} from "./craft/craft.component";
import {HttpModule, JsonpModule} from "@angular/http";

@NgModule({
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpModule,
    JsonpModule,
    routing
  ],
  declarations: [
    AppComponent,
    CraftComponent
  ],
  providers: [
    appRoutingProvider
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
