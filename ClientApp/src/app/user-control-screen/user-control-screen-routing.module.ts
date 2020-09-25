import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {UserControlScreenComponent} from './user-control-screen.component';
import {UserBookmarksComponent} from './user-bookmarks/user-bookmarks.component';
import {UserSettingsComponent} from './user-settings/user-settings.component';

const routes: Routes = [
  {
    path: '', component: UserControlScreenComponent, children: [
      {path: 'bookmarks', component: UserBookmarksComponent},
      {path: 'settings', component: UserSettingsComponent}
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

