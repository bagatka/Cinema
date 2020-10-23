import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {AdminFilmsComponent} from './admin-films.component';
import {AdminAddFilmComponent} from './admin-add-film/admin-add-film.component';
import {AdminAllFilmsComponent} from './admin-all-films/admin-all-films.component';
import {AdminEditFimComponent} from './admin-edit-fim/admin-edit-fim.component';

const routes: Routes = [
  {
    path: '', component: AdminFilmsComponent, children: [
      {path: '', component: AdminAllFilmsComponent},
      {path: 'add', component: AdminAddFilmComponent},
      {path: ':id', component: AdminEditFimComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminFilmsRoutingModule {
}
