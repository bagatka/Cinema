import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {AdminServicesComponent} from './admin-services.component';
import {AdminAddServiceComponent} from './admin-add-service/admin-add-service.component';

const routes: Routes = [
  {
    path: '',
    component: AdminServicesComponent,
    children: [
      {
        path: 'add',
        data: {
          expectedRole: 'Admin'
        },
        component: AdminAddServiceComponent
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminServicesRoutingModule {
}
