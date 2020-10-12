import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {AdminShowsComponent} from './admin-shows.component';
import {AdminAddShowComponent} from './admin-add-show/admin-add-show.component';

const routes: Routes = [
  {
    path: '', component: AdminShowsComponent, children: [
      {path: 'add', component: AdminAddShowComponent},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminShowsRoutingModule {
}
