import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {UserControlScreenComponent} from './user-control-screen.component';
import {UserBookmarksComponent} from './user-bookmarks/user-bookmarks.component';
import {UserSettingsComponent} from './user-settings/user-settings.component';
import {UserTicketsComponent} from './user-tickets/user-tickets.component';
import {UserHistoryComponent} from './user-history/user-history.component';

const routes: Routes = [
  {
    path: '', component: UserControlScreenComponent, children: [
      {path: 'bookmarks', component: UserBookmarksComponent},
      {path: 'settings', component: UserSettingsComponent},
      {path: 'tickets', component: UserTicketsComponent},
      {path: 'history', component: UserHistoryComponent}
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class UserControlScreenRoutingModule {
}

