import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import validate = WebAssembly.validate;

@Component({
  selector: 'app-admin-add-film',
  templateUrl: './admin-add-film.component.html',
  styleUrls: ['./admin-add-film.component.css']
})
export class AdminAddFilmComponent implements OnInit {

  addFilmInput: FormGroup;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.addFilmInput = this.formBuilder.group({
      title: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
      year: new FormControl('', Validators.required),
      posterUrl: new FormControl(''),
      bannerUrl: new FormControl('')
    });
  }
}
