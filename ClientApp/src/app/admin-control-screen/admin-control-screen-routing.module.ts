import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {AdminControlScreenComponent} from './admin-control-screen.component';


const routes: Routes = [
  {
    path: '',
    component: AdminControlScreenComponent,
    children: [
      {
        path: 'films',
        data: {
          expectedRole: 'Admin'
        },
        loadChildren: () => import(`./admin-films/admin-films-routing.module`).then(m => m.AdminFilmsRoutingModule)
      },
      {
        path: 'cinemas',
        data: {
          expectedRole: 'Admin'
        },
        loadChildren: () => import(`./admin-cinemas/admin-cinemas-routing.module`).then(m => m.AdminCinemasRoutingModule)
      },
      {
        path: 'shows',
        data: {
          expectedRole: 'Admin'
        },
        loadChildren: () => import(`./admin-shows/admin-shows-routing.module`).then(m => m.AdminShowsRoutingModule)
      },
      {
        path: 'services',
        data: {
          expectedRole: 'Admin'
        },
        loadChildren: () => import(`./admin-services/admin-services-routing.module`).then(m => m.AdminServicesRoutingModule)
      },
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class AdminControlScreenRoutingModule {
}
