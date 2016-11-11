/**
 * Created by tang on 2016/8/21.
 */

import {Routes, RouterModule} from "@angular/router";
import {CraftComponent} from "./craft/craft.component";
import {DataAnalysisComponent} from "./data-analysis.unit/data-analysis.component";
import {DataShowComponent} from "./craft/data-show/data-show.component";
import {ETLComponent} from "./etl/etl.component";
import {HistoryComponent} from "./history.unit/history.component";
import {AlgoriithmComponent} from "./algorithm-up/algorithm-up.component";

const appRoutes: Routes = [
    {
        path: '',
        redirectTo: '/history',
        pathMatch: 'full'
    },
    {path: 'craft', component: CraftComponent},
    {path: 'data-analysis', component: DataAnalysisComponent},
    {path: 'result-show', component: DataShowComponent},
    {path: 'etl', component: ETLComponent},
    {path: 'history', component: HistoryComponent},
    {path: 'algo-up',component:AlgoriithmComponent}
];


export const appRoutingProvider: any[] = [];
export const routing = RouterModule.forRoot(appRoutes);
