import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {HomeScreenComponent} from './home-screen/home-screen.component';
import {SearchScreenComponent} from './search-screen/search-screen.component';

const routes: Routes = [
  {path: 'home', component: HomeScreenComponent},
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: 'cinemas', component: HomeScreenComponent},
  {path: 'films', component: SearchScreenComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
