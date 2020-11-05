import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate} from '@angular/router';

import {AccountService} from '../Services/account.service';
import {MatDialog} from '@angular/material/dialog';
import {AccountFormComponent} from '../account-form/account-form.component';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private accountService: AccountService,
    private dialog: MatDialog
  ) {
  }

  canActivate(route: ActivatedRouteSnapshot): boolean {
    if (this.accountService.getAuthorizationStatus()) {
      const expectedRole = route.data.expectedRole;
      const currentRole = this.accountService.getRole();
      
      if (expectedRole === currentRole) {
        return true;
      }
    }

    this.openLoginForm();
    return false;
  }

  private openLoginForm(): void {
    this.dialog.open(AccountFormComponent, {
      width: '20vw',
      height: '55vh'
    });
  }
}
