import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AdminControlScreenComponent} from './admin-control-screen.component';
import {AdminFilmsComponent} from './admin-films/admin-films.component';


const routes: Routes = [
  {
    path: '', component: AdminControlScreenComponent, children: [
      {
        path: 'films',
        loadChildren: () => import(`./admin-films/admin-films-routing.module`).then(m => m.AdminFilmsRoutingModule)
      },
      {
        path: 'cinemas',
        loadChildren: () => import(`./admin-cinemas/admin-cinemas-routing.module`).then(m => m.AdminCinemasRoutingModule)
      },
      {
        path: 'shows',
        loadChildren: () => import(`./admin-shows/admin-shows-routing.module`).then(m => m.AdminShowsRoutingModule)
      },
      {
        path: 'services',
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
