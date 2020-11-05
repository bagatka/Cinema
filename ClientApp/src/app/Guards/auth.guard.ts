import {Injectable} from '@angular/core';
import {CanActivateChild, ActivatedRouteSnapshot} from '@angular/router';

import {AccountService} from '../Services/account.service';
import {MatDialog} from '@angular/material/dialog';
import {AccountFormComponent} from '../account-form/account-form.component';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivateChild {

  constructor(
    private accountService: AccountService,
    private dialog: MatDialog
  ) {
  }

  canActivateChild(childRoute: ActivatedRouteSnapshot): boolean {
    if (this.accountService.getAuthorizationStatus()) {
      const expectedRole = childRoute.data.expectedRole;
      const currentRole = this.accountService.getRole();

      console.log(`expectedRole: ${expectedRole}`);
      console.log(`currentRole: ${currentRole}`);

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
