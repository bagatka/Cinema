import {Component, OnInit} from '@angular/core';

enum MenuSelect {
  Bookmarks,
  Settings
}

@Component({
  selector: 'app-user-control-screen',
  templateUrl: './user-control-screen.component.html',
  styleUrls: ['./user-control-screen.component.css']
})
export class UserControlScreenComponent implements OnInit {

  activeSettings: boolean[] = [false, false];

  constructor() {
  }

  public get menuSelect(): typeof MenuSelect {
    return MenuSelect;
  }

  setActive(select: MenuSelect): void {
    this.activeSettings = this.activeSettings.map(() => false);
    console.log('Hello');
    switch (select) {
      case MenuSelect.Bookmarks:
        this.activeSettings[select] = true;
        break;
      case MenuSelect.Settings:
        this.activeSettings.map(value => false);
        this.activeSettings[select] = true;
        break;
    }
  }

  ngOnInit(): void {
  }

}
