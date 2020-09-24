import {Component} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';

import {SearchBarComponent} from '../search-bar/search-bar.component';
import {AccountFormComponent} from '../account-form/account-form.component';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  constructor(public dialog: MatDialog) {
  }

  openSearch(): void {
    this.dialog.open(SearchBarComponent, {
      width: '20vw',
    });
  }

  openAccountForm(): void {
    this.dialog.open(AccountFormComponent, {
      width: '20vw',
      height: '55vh'
    });
  }
}
