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

import {SelectComponent} from "ng2-select";

import {AppComponent} from "./app.component";
import {routing, appRoutingProvider} from "./app.routing";
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
import { ETLComponent } from './etl/etl.component';
import { HistoryComponent } from './history.unit/history.component';
import {TaskShowComponent} from "./craft/data-show/task-show.component";
import {AlgoriithmComponent} from "./algorithm-up/algorithm-up.component";

// Imports for loading & configuring the in-memory web api
// import { InMemoryWebApiModule } from 'angular2-in-memory-web-api';
// import { InMemoryDataService }  from './in-memory-data.service';

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
        // InMemoryWebApiModule.forRoot(InMemoryDataService)
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
        ETLComponent,
        HistoryComponent,
        TaskShowComponent,
        AlgoriithmComponent,

    ],
    providers: [
        appRoutingProvider,
        GlobalService
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
