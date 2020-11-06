import {Component} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {Router} from '@angular/router';

import {SearchBarComponent} from '../search-bar/search-bar.component';
import {AccountFormComponent} from '../account-form/account-form.component';

import {AccountService} from '../Services/account.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  userName: string;

  constructor(
    private dialog: MatDialog,
    private accountService: AccountService,
    private router: Router
  ) {
  }

  getUserName(): string {
    this.userName = this.accountService.getUserName();
    return this.userName ? this.userName : 'Account';
  }

  openSearch(): void {
    this.dialog.open(SearchBarComponent, {
      width: '20vw',
    });
  }

  openAccountForm(): void {
    if (this.accountService.getAuthorizationStatus()) {
      const currentRole = this.accountService.getRole().toLowerCase();

      let route: string;

      switch (currentRole) {
        case 'admin':
          route = currentRole;
          break;
        case 'user':
          route = 'profile';
          break;
        default:
          return;
      }

      this.router.navigateByUrl(`/${route}`);
    } else {
      this.dialog.open(AccountFormComponent, {
        width: '20vw',
        height: '55vh'
      });
    }
  }
}
