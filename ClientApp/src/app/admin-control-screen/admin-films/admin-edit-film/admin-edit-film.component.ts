import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Location} from '@angular/common';

import {Film} from '../../../Interfaces/film';

import {SnackbarMessages} from '../../../Enums/snackbar-messages.enum';

import {FilmService} from '../../../Services/film.service';
import {SnackbarService} from '../../../Services/snackbar.service';
import {Constants} from '../../../../environments/environment';

@Component({
  selector: 'app-admin-edit-fim',
  templateUrl: './admin-edit-film.component.html',
  styleUrls: ['./admin-edit-film.component.css']
})
export class AdminEditFilmComponent implements OnInit {

  editFilmInput: FormGroup;
  filmId: string;
  film: Film;
  isFormReady = false;
  id: number;

  constructor(
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private filmService: FilmService,
    private snackbarService: SnackbarService,
    private location: Location
  ) {
  }

  ngOnInit(): void {
    this.id = +this.route.snapshot.paramMap.get('id');
    this.loadFilm();
  }

  private loadFilm(): void {
    this.filmService.getFilmById(this.id).subscribe(film => {
      this.film = film;
      this.createForm();
      this.isFormReady = true;
    });
  }

  private createForm(): void {
    this.editFilmInput = this.formBuilder.group({
      title: new FormControl(this.film.title, Validators.required),
      description: new FormControl(this.film.description, Validators.required),
      year: new FormControl(this.film.year, [Validators.required, Validators.min(Constants.FIRST_FILM_YEAR)]),
      duration: new FormControl(this.film.duration, Validators.required),
      posterUrl: new FormControl(this.film.posterUrl ? this.film.posterUrl : ''),
      bannerUrl: new FormControl(this.film.bannerUrl ? this.film.bannerUrl : '')
    });
  }

  updateFilm(): void {
    this.filmService.updateFilm(this.editFilmInput.value, this.id).subscribe(
      () => {
        this.snackbarService.displaySnackbar(SnackbarMessages.updated);
      },
      () => this.snackbarService.displaySnackbar(SnackbarMessages.error)
    );
    this.location.back();
  }

  cancel(): void {
    this.location.back();
  }
}
