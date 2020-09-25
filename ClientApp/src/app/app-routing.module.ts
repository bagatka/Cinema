import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {HomeScreenComponent} from './home-screen/home-screen.component';
import {SearchScreenComponent} from './search-screen/search-screen.component';
import {RegistrationScreenComponent} from './registration-screen/registration-screen.component';

const routes: Routes = [
  {path: 'home', component: HomeScreenComponent},
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: 'cinemas', component: HomeScreenComponent},
  {path: 'films', component: SearchScreenComponent},
  {path: 'registration', component: RegistrationScreenComponent},
  {
    path: 'profile', loadChildren: () => import(`./user-control-screen/user-control-screen-routing.module`)
      .then(m => m.UserControlScreenRoutingModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {enableTracing: false})],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
