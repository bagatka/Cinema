import {Component} from '@angular/core';
import {AccountService} from '../Services/account.service';
import {Router} from '@angular/router';

enum AdminMenuSelect {
  Settings,
  AddFilm,
  EditFilm,
  AddCinema,
  EditCinema,
  AddShow,
  EditShow,
  AddService,
  EditService
}

@Component({
  selector: 'app-admin-control-screen',
  templateUrl: './admin-control-screen.component.html',
  styleUrls: ['./admin-control-screen.component.css']
})
export class AdminControlScreenComponent {

  menuSize: number;
  activeSettings: boolean[] = [];

  constructor(
    private accountService: AccountService,
    private router: Router
  ) {
    this.menuSize = Object.keys(AdminMenuSelect).length / 2;
    for (let i = 0; i < this.menuSize; i++) {
      this.activeSettings.push(false);
    }
  }

  public get adminMenuSelect(): typeof AdminMenuSelect {
    return AdminMenuSelect;
  }

  setActive(select: AdminMenuSelect): void {
    this.activeSettings = this.activeSettings.map(() => false);
    this.activeSettings[select] = true;
  }

  logout(): void {
    this.accountService.logout();
    this.router.navigateByUrl('/home');
  }
}
