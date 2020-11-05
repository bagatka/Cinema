import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {AdminAddCinemaComponent} from './admin-add-cinema/admin-add-cinema.component';
import {AdminCinemasComponent} from './admin-cinemas.component';
import {AdminAllCinemasComponent} from './admin-all-cinemas/admin-all-cinemas.component';
import {AdminEditCinemaComponent} from './admin-edit-cinema/admin-edit-cinema.component';

const routes: Routes = [
  {
    path: '',
    component: AdminCinemasComponent,
    children: [
      {path: '', component: AdminAllCinemasComponent},
      {
        path: 'add',
        data: {
          expectedRole: 'Admin'
        },
        component: AdminAddCinemaComponent
      },
      {
        path: ':id',
        data: {
          expectedRole: 'Admin'
        },
        component: AdminEditCinemaComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminCinemasRoutingModule {
}
