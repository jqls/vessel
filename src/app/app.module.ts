/**
 * Created by tang on 2016/8/18.
 */

import {NgModule} from "@angular/core";
import {BrowserModule} from "@angular/platform-browser";
import {ReactiveFormsModule, FormsModule} from "@angular/forms";
import {HttpModule, JsonpModule, Response} from "@angular/http";
import {MdButtonModule} from "@angular2-material/button";
import {MdCardModule} from "@angular2-material/card";

import {SelectComponent} from "ng2-select";

import {AppComponent} from "./app.component";
import {routing, appRoutingProvider} from "./app.routing";
import {CraftComponent} from "./craft/craft.component";
import { CraftStormComponent } from './craft/craft-storm.component';
import {CraftMapreduceComponent} from "./craft/craft-mapreduce.component";
import {NavbarComponent} from "./navbar.component/navbar.component";
import {ToolboxComponent} from "./craft/toolbox.component/toolbox.component";
import {ToolboxMapreduceComponent} from "./craft/toolbox.component/toolbox-mapreduce.component";
import {DrawboardComponent} from "./craft/drawboard.component/drawboard.component";
import {ParametersComponent} from "./craft/parameters.component/parameters.component";
import {ResultComponent} from "./craft/result.component/result.component";
import {InputsComponent} from "./craft/inputs.component/inputs.component";
import {DataAnalysisComponent} from "./data-analysis.unit/data-analysis.component";

// Imports for loading & configuring the in-memory web api
import { InMemoryWebApiModule } from 'angular2-in-memory-web-api';
import { InMemoryDataService }  from './in-memory-data.service';

@NgModule({
    imports: [
        BrowserModule,
        ReactiveFormsModule,
        FormsModule,
        HttpModule,
        JsonpModule,
        routing,
        MdButtonModule,
        MdCardModule,
        InMemoryWebApiModule.forRoot(InMemoryDataService)
    ],
    declarations: [
        AppComponent,
        NavbarComponent,
        CraftComponent,
        CraftMapreduceComponent,
        CraftStormComponent,
        DataAnalysisComponent,
        ToolboxComponent,
        DrawboardComponent,
        ParametersComponent,
        ResultComponent,
        ToolboxMapreduceComponent,
        InputsComponent,
    ],
    providers: [
        appRoutingProvider
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
