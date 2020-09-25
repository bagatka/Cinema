import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';

import {ComparePassword} from '../account-form/passwordMatchValidator.validator';

@Component({
  selector: 'app-registration-screen',
  templateUrl: './registration-screen.component.html',
  styleUrls: ['./registration-screen.component.css']
})
export class RegistrationScreenComponent implements OnInit {

  userInput: FormGroup;
  hide = true;
  hideConfirm = true;

  constructor(private formBuilder: FormBuilder) {
  }

  confirmPasswordValidator(group: FormGroup): { [key: string]: boolean } | null {
    const password = group.get('password').value;
    const confirmPassword = group.get('confirmPassword').value;

    return password === confirmPassword ? null : {isMatch: true};
  }

  ngOnInit(): void {
    this.userInput = this.formBuilder.group({
        firstName: new FormControl('', Validators.required),
        surname: new FormControl('', Validators.required),
        email: new FormControl('', [Validators.required, Validators.email]),
        username: new FormControl('', Validators.required),
        password: new FormControl('', [Validators.required, Validators.minLength(6)]),
        confirmPassword: new FormControl('', [Validators.required])
      },
      {
        validator: ComparePassword('password', 'confirmPassword')
      });
  }
}
