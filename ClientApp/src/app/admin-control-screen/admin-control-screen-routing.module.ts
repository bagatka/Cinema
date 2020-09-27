import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AdminControlScreenComponent} from './admin-control-screen.component';


const routes: Routes = [
  {
    path: '', component: AdminControlScreenComponent, children: [
      {path: 'settings'},
      {path: 'films'},
      {path: 'cinemas'},
      {path: 'shows'},
      {path: 'services'}
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class AdminControlScreenRoutingModule {
}
