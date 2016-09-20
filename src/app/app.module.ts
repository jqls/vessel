/**
 * Created by tang on 2016/8/18.
 */

import {BrowserModule} from "@angular/platform-browser";
import {ReactiveFormsModule, FormsModule} from "@angular/forms";
import {NgModule} from "@angular/core";
import {AppComponent} from "./app.component";
import {routing, appRoutingProvider} from "./app.routing";
import {CraftComponent} from "./craft/craft.component";
import {HttpModule, JsonpModule, Response} from "@angular/http";
import {CraftMapreduceComponent} from "./craft/craft-mapreduce.component";
import {DataAnalysisComponent} from "./data-analysis.unit/data-analysis.component";
import {MdButtonModule} from "@angular2-material/button";
import {MdCardModule} from "@angular2-material/card";
import {NavbarComponent} from "./navbar.component/navbar.component";
import {ToolboxComponent} from "./craft/toolbox.component/toolbox.component";
import {DrawboardComponent} from "./craft/drawboard.component/drawboard.component";
import {ParametersComponent} from "./craft/parameters.component/parameters.component";
import {ResultComponent} from "./craft/result.component/result.component";
import {ToolboxMapreduceComponent} from "./craft/toolbox.component/toolbox-mapreduce.component";
import {InputsComponent} from "./craft/inputs.component/inputs.component";
import {DatabaseControlComponent} from "./data-analysis.unit/database-control/database-control.component";
import {ResultPresentationComponent} from "./data-analysis.unit/result-presentation/result-presentation.component";
import {SelectComponent} from "ng2-select";


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
    ],
    declarations: [
        AppComponent,
        NavbarComponent,
        CraftComponent,
        CraftMapreduceComponent,
        DataAnalysisComponent,
        ToolboxComponent,
        DrawboardComponent,
        ParametersComponent,
        ResultComponent,
        ToolboxMapreduceComponent,
        InputsComponent,
        DatabaseControlComponent,
        ResultPresentationComponent,

        DatabaseControlComponent,
        ResultPresentationComponent,
    ],
    providers: [
        appRoutingProvider
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
