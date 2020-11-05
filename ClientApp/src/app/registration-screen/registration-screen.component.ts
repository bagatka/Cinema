import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';

import {MatchValidator} from '../Validators/MatchValidator.validator';
import {AccountService} from '../Services/account.service';
import {Location} from '@angular/common';

@Component({
  selector: 'app-registration-screen',
  templateUrl: './registration-screen.component.html',
  styleUrls: ['./registration-screen.component.css']
})
export class RegistrationScreenComponent implements OnInit {

  userInput: FormGroup;
  hide = true;
  hideConfirm = true;

  constructor(
    private formBuilder: FormBuilder,
    private accountService: AccountService,
    private location: Location
  ) {
  }

  ngOnInit(): void {
    this.userInput = this.formBuilder.group({
        firstName: new FormControl('', Validators.required),
        lastName: new FormControl('', Validators.required),
        email: new FormControl('', [Validators.required, Validators.email]),
        username: new FormControl('', [Validators.required, Validators.minLength(6)]),
        password: new FormControl('', [Validators.required, Validators.minLength(6)]),
        confirmPassword: new FormControl('', [Validators.required])
      },
      {
        validator: MatchValidator('password', 'confirmPassword')
      });
  }

  register(): void {
    this.accountService.register(this.userInput.value);
    this.location.back();
  }
}
