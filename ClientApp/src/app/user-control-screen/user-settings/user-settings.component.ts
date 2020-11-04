import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';

import {MatchValidator} from '../../Validators/MatchValidator.validator';
import {AccountService} from '../../Services/account.service';

@Component({
  selector: 'app-user-settings',
  templateUrl: './user-settings.component.html',
  styleUrls: ['./user-settings.component.css']
})
export class UserSettingsComponent implements OnInit {

  changeEmailStatus = true;
  emailChangeInput: FormGroup;
  changePasswordStatus = true;
  passwordChangeInput: FormGroup;
  hideOld = true;
  hideNew = true;
  hideConfirm = true;
  currentEmail: string;

  constructor(
    private formBuilder: FormBuilder,
    private accountService: AccountService
  ) {
  }

  public ngOnInit(): void {
    this.emailChangeInput = this.formBuilder.group({
      currentEmail: new FormControl('', [Validators.required, Validators.email]),
      newEmail: new FormControl('', [Validators.required, Validators.email]),
      confirmEmail: new FormControl('', Validators.required)
    }, {
      validator: MatchValidator('newEmail', 'confirmEmail')
    });

    this.passwordChangeInput = this.formBuilder.group({
      currentPassword: new FormControl('', Validators.required),
      newPassword: new FormControl('', Validators.required),
      confirmPassword: new FormControl('', Validators.required)
    }, {
      validator: MatchValidator('newPassword', 'confirmPassword')
    });

    this.currentEmail = this.accountService.getEmail();
  }

  onEmailFormCall(): void {
    this.changePasswordStatus = true;
    this.changeEmailStatus = !this.changeEmailStatus;
  }

  onPasswordFormCall(): void {
    this.changeEmailStatus = true;
    this.changePasswordStatus = !this.changePasswordStatus;
  }
}
