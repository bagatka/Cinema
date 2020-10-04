import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AdminAddCinemaComponent} from './admin-add-cinema/admin-add-cinema.component';
import {AdminCinemasComponent} from './admin-cinemas.component';

const routes: Routes = [
  {
    path: '', component: AdminCinemasComponent, children: [
      {path: 'add', component: AdminAddCinemaComponent},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminCinemasRoutingModule { }
