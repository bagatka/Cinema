import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Observable} from 'rxjs';
import {Film} from '../../../Interfaces/film';
import {Cinema} from '../../../Interfaces/cinema';
import {Hall} from '../../../Interfaces/hall';

@Component({
  selector: 'app-admin-add-show',
  templateUrl: './admin-add-show.component.html',
  styleUrls: ['./admin-add-show.component.css']
})
export class AdminAddShowComponent implements OnInit {

  addShowInput: FormGroup;
  today = new Date();
  films$ = new Observable<Film[]>();
  cinemas$ = new Observable<Cinema[]>();
  halls$ = new Observable<Hall[]>();

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.addShowInput = this.formBuilder.group({
      film: new FormControl('', Validators.required),
      cinema: new FormControl('', Validators.required),
      hall: new FormControl('', Validators.required),
      dateTime: new FormControl('', Validators.required)
    });
  }
}
