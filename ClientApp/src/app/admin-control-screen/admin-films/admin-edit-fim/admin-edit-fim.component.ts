import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {FilmService} from '../../../Services/film.service';
import {SnackbarService} from '../../../Services/snackbar.service';
import {SnackbarMessages} from '../../../Enums/snackbar-messages.enum';
import {Film} from '../../../Interfaces/film';
import {Location} from '@angular/common';

@Component({
  selector: 'app-admin-edit-fim',
  templateUrl: './admin-edit-fim.component.html',
  styleUrls: ['./admin-edit-fim.component.css']
})
export class AdminEditFimComponent implements OnInit {

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
      this.isFormReady = true;
      this.createForm();
    });
  }

  createForm(): void {
    this.editFilmInput = this.formBuilder.group({
      title: new FormControl(this.film.title, Validators.required),
      description: new FormControl(this.film.description, Validators.required),
      year: new FormControl(this.film.year, [Validators.required, Validators.min(1878)]),
      duration: new FormControl(this.film.duration, Validators.required),
      posterUrl: new FormControl(this.film.posterUrl ? this.film.posterUrl : ''),
      bannerUrl: new FormControl(this.film.bannerUrl ? this.film.bannerUrl : '')
    });
  }

  updateFilm(): void {
    this.filmService.updateFilm(this.editFilmInput.value, this.id).subscribe();
    this.snackbarService.displaySnackbar(SnackbarMessages.updated);
    this.location.back();
  }

  cancel(): void {
    this.location.back();
  }
}
