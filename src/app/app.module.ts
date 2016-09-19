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
import {CraftMapreduceComponent} from "./craft/craft-mapreduce.component";
import {DataAnalysisComponent} from "./data-analysis.unit/data-analysis.component";
import {MdButton} from "@angular2-material/button";
import {MdCardModule} from "@angular2-material/card";


@NgModule({
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpModule,
    JsonpModule,
    routing,
    MdButton,
    MdCardModule,
    // InMemoryWebApiModule.forRoot(InMemoryDataService)
  ],
  declarations: [
    AppComponent,
    CraftComponent,
    CraftMapreduceComponent,
    DataAnalysisComponent,
  ],
  providers: [
    appRoutingProvider
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
