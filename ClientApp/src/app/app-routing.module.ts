import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {HomeScreenComponent} from './home-screen/home-screen.component';

const routes: Routes = [
  {path: 'home', component: HomeScreenComponent},
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: 'cinemas', component: HomeScreenComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
