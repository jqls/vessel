/**
 * Created by tang on 2016/8/18.
 */
import "./rxjs-extensions";

import {NgModule} from "@angular/core";
import {BrowserModule} from "@angular/platform-browser";
import {ReactiveFormsModule, FormsModule} from "@angular/forms";
import {HttpModule, JsonpModule, Response} from "@angular/http";
import {MdButtonModule} from "@angular2-material/button";
import {MdCardModule} from "@angular2-material/card";

import {AppComponent} from "./app.component";
import { AppRoutingModule} from "./app.routing.module";
import {CraftComponent} from "./craft/craft.component";
import {NavbarComponent} from "./navbar.component/navbar.component";
import {ToolboxComponent} from "./craft/toolbox.component/toolbox.component";
import {ToolboxMapreduceComponent} from "./craft/toolbox.component/toolbox-mapreduce.component";
import {DrawboardComponent} from "./craft/drawboard.component/drawboard.component";
import {ParametersComponent} from "./craft/parameters.component/parameters.component";
import {ResultComponent} from "./craft/result.component/result.component";
import {InputsComponent} from "./craft/inputs.component/inputs.component";
import {DataAnalysisComponent} from "./data-analysis.unit/data-analysis.component";
import { ToolboxStormComponent } from './craft/toolbox.component/toolbox-storm/toolbox-storm.component';
import { DataShowComponent } from './craft/data-show/data-show.component';
import {GlobalService} from "./global.service";
import { BarComponent } from './craft/data-show/bar/bar.component';
import { PieComponent } from './craft/data-show/pie/pie.component';
import { HistoryComponent } from './history.unit/history.component';
import {TaskShowComponent} from "./craft/data-show/task-show.component";
import {AlgorithmComponent} from "./algorithm-up/algorithm-up.component";
import {ETLModule} from "./etl/etl.module";

// Imports for loading & configuring the in-memory web api
import { InMemoryWebApiModule } from 'angular2-in-memory-web-api';
import { InMemoryDataService }  from './in-memory-data.service';
import { TreeModule } from 'angular2-tree-component';
@NgModule({
    imports: [
        BrowserModule,
        ReactiveFormsModule,
        FormsModule,
        HttpModule,
        JsonpModule,
        MdButtonModule,
        MdCardModule,
        ETLModule,
        AppRoutingModule,
        TreeModule,

        InMemoryWebApiModule.forRoot(InMemoryDataService)
    ],
    declarations: [
        AppComponent,
        NavbarComponent,
        CraftComponent,
        DataAnalysisComponent,
        ToolboxComponent,
        DrawboardComponent,
        ParametersComponent,
        ResultComponent,
        ToolboxMapreduceComponent,
        InputsComponent,
        ToolboxStormComponent,
        DataShowComponent,
        BarComponent,
        PieComponent,
        HistoryComponent,
        TaskShowComponent,
        AlgorithmComponent,

    ],
    providers: [
        GlobalService
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
