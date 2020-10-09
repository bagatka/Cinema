import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {AdminFilmsComponent} from './admin-films.component';
import {AdminAddFilmComponent} from './admin-add-film/admin-add-film.component';
import {AdminAllFilmsComponent} from './admin-all-films/admin-all-films.component';

const routes: Routes = [
  {
    path: '', component: AdminFilmsComponent, children: [
      {path: '', component: AdminAllFilmsComponent},
      {path: 'add', component: AdminAddFilmComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminFilmsRoutingModule {
}
