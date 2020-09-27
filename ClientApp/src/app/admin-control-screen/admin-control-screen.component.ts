import {Component} from '@angular/core';

enum AdminMenuSelect {
  Global,
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

  constructor() {
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

}
