/**
 * Created by tang on 2016/8/21.
 */

import {Routes, RouterModule} from "@angular/router";
import {CraftComponent} from "./craft/craft.component";


const appRoutes: Routes = [
  {
    path: '',
    redirectTo: '/craft',
    pathMatch: 'full'
  },
  {path: 'craft', component: CraftComponent}
];


export const appRoutingProvider: any[] = [];
export const routing = RouterModule.forRoot(appRoutes);
