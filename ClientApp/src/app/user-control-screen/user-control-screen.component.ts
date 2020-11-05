import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {AccountService} from '../Services/account.service';

enum UserMenuSelect {
  Bookmarks,
  Settings,
  Tickets,
  History
}

@Component({
  selector: 'app-user-control-screen',
  templateUrl: './user-control-screen.component.html',
  styleUrls: ['./user-control-screen.component.css']
})
export class UserControlScreenComponent {

  menuSize: number;
  activeSettings: boolean[] = [];

  constructor(
    private accountService: AccountService,
    private router: Router
  ) {
    this.menuSize = Object.keys(UserMenuSelect).length / 2;
    for (let i = 0; i < this.menuSize; i++) {
      this.activeSettings.push(false);
    }
  }

  public get menuSelect(): typeof UserMenuSelect {
    return UserMenuSelect;
  }

  setActive(select: UserMenuSelect): void {
    this.activeSettings = this.activeSettings.map(() => false);
    this.activeSettings[select] = true;
  }

  logout(): void {
    this.accountService.logout();
    this.router.navigateByUrl('/home');
  }
}
