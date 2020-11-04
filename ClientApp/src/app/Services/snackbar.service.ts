import { Injectable } from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';

import {SnackbarMessages} from '../Enums/snackbar-messages.enum';

@Injectable({
  providedIn: 'root'
})
export class SnackbarService {

  constructor(private snackBar: MatSnackBar) { }

  public displaySnackbar(message: SnackbarMessages): void {
    if (!message){
      return;
    }

    this.snackBar.open(message, undefined, { duration: 1000 });
  }
}
