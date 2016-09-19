/**
 * Created by tang on 2016/8/21.
 */

import {Routes, RouterModule} from "@angular/router";
import {CraftComponent} from "./craft/craft.component";
import {CraftMapreduceComponent} from "./craft/craft-mapreduce.component";
import {DataAnalysisComponent} from "./data-analysis.unit/data-analysis.component";

const appRoutes: Routes = [
  {
    path: '',
    redirectTo: '/craft',
    pathMatch: 'full'
  },
  {path: 'craft', component: CraftComponent},
  {path: 'craft-mapreduce', component: CraftMapreduceComponent},
  {path: 'data-analysis', component: DataAnalysisComponent}

];


export const appRoutingProvider: any[] = [];
export const routing = RouterModule.forRoot(appRoutes);
