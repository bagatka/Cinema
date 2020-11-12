import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';

import {SnackbarMessages} from '../../../Enums/snackbar-messages.enum';

import {FilmService} from '../../../Services/film.service';
import {SnackbarService} from '../../../Services/snackbar.service';
import {Constants} from '../../../../environments/environment';

@Component({
  selector: 'app-admin-add-film',
  templateUrl: './admin-add-film.component.html',
  styleUrls: ['./admin-add-film.component.css']
})
export class AdminAddFilmComponent implements OnInit {

  addFilmInput: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private filmService: FilmService,
    private snackbarService: SnackbarService
  ) {
  }

  ngOnInit(): void {
    this.addFilmInput = this.formBuilder.group({
      title: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
      year: new FormControl('', [Validators.required, Validators.min(Constants.FIRST_FILM_YEAR)]),
      duration: new FormControl('', Validators.required),
      posterUrl: new FormControl(''),
      bannerUrl: new FormControl('')
    });
  }

  createFilm(): void {
    this.filmService.createFilm(this.addFilmInput.value).subscribe(() =>
      {
      this.snackbarService.displaySnackbar(SnackbarMessages.created);
    },
      () => this.snackbarService.displaySnackbar(SnackbarMessages.error)
    );
  }
}
