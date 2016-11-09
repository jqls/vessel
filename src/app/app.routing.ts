/**
 * Created by tang on 2016/8/21.
 */

import {Routes, RouterModule} from "@angular/router";
import {CraftComponent} from "./craft/craft.component";
import {CraftMapreduceComponent} from "./craft/craft-mapreduce.component";
import {CraftStormComponent} from "./craft/craft-storm.component";
import {DataAnalysisComponent} from "./data-analysis.unit/data-analysis.component";
import {DataShowComponent} from "./craft/data-show/data-show.component";
import {ETLComponent} from "./etl/etl.component";
import {HistoryComponent} from "./history.unit/history.component";

const appRoutes: Routes = [
    {
        path: '',
        redirectTo: '/history',
        pathMatch: 'full'
    },
    {path: 'craft', component: CraftComponent},
    {path: 'craft-mapreduce', component: CraftMapreduceComponent},
    {path: 'craft-storm', component: CraftStormComponent},
    {path: 'data-analysis', component: DataAnalysisComponent},
    {path: 'result-show', component: DataShowComponent},
    {path: 'etl', component: ETLComponent},
    {path: 'history', component: HistoryComponent},
];


export const appRoutingProvider: any[] = [];
export const routing = RouterModule.forRoot(appRoutes);
