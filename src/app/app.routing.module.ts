/**
 * Created by tang on 2016/8/21.
 */

import {RouterModule} from "@angular/router";
import {CraftComponent} from "./craft/craft.component";
import {DataAnalysisComponent} from "./data-analysis.unit/data-analysis.component";
import {DataShowComponent} from "./craft/data-show/data-show.component";
import {HistoryComponent} from "./history.unit/history.component";
import {AlgorithmComponent} from "./algorithm-up/algorithm-up.component";
import {AlgorithmManagement} from "./algorithm-up/algorithm-management/algorithm-management.component";
import {NgModule} from "@angular/core";

@NgModule({
    imports: [
        RouterModule.forRoot([
            {
                path: '',
                redirectTo: '/history',
                pathMatch: 'full'
            },
            {path: 'craft', component: CraftComponent},
            {path: 'data-analysis', component: DataAnalysisComponent},
            {path: 'result-show', component: DataShowComponent},
            {path: 'history', component: HistoryComponent},
            {path: 'algo-up',component:AlgorithmComponent},
            {path: 'algo-manage',component:AlgorithmManagement}
        ]),
    ],
    exports: [
        RouterModule
    ]
})
export class AppRoutingModule {}