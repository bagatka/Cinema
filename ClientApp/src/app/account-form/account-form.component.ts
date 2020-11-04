import {Component, Inject} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

import {AccountService} from '../Services/account.service';

@Component({
  selector: 'app-account-form',
  templateUrl: './account-form.component.html',
  styleUrls: ['./account-form.component.css']
})
export class AccountFormComponent {

  constructor(
    public dialogRef: MatDialogRef<AccountFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data,
    private accountService: AccountService,
    private router: Router
  ) {
  }

  userInput = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, Validators.required)
  });
  hide = true;

  login(): void {
    this.accountService.login(this.userInput.value);
    this.router.navigateByUrl('/profile');
  }

  closeDialog(): void {
    this.dialogRef.close();
  }
}
