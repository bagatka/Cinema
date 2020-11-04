import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {MatDatepickerInputEvent} from '@angular/material/datepicker';

import {Observable, Subject} from 'rxjs';
import {debounceTime, switchMap} from 'rxjs/operators';

import {Film} from '../../../Interfaces/film';
import {Cinema} from '../../../Interfaces/cinema';
import {Hall} from '../../../Interfaces/hall';
import {Show} from '../../../Interfaces/show';
import {ShowForManipulation} from '../../../Interfaces/show-for-manipulation';

import {SnackbarMessages} from '../../../Enums/snackbar-messages.enum';

import {FilmService} from '../../../Services/film.service';
import {CinemaService} from '../../../Services/cinema.service';
import {ShowService} from '../../../Services/show.service';
import {SnackbarService} from '../../../Services/snackbar.service';

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
  hallTimeTable$ = new Observable<Show[]>();
  selectedDay: string;
  private searchFilms = new Subject<string>();
  private searchCinemas = new Subject<string>();
  private searchHalls = new Subject<number>();
  private searchHallTimeTable = new Subject<number>();
  private showData: ShowForManipulation = {};

  constructor(
    private formBuilder: FormBuilder,
    private filmService: FilmService,
    private cinemaService: CinemaService,
    private showService: ShowService,
    private snackbarService: SnackbarService
  ) {
  }

  ngOnInit(): void {
    this.addShowInput = this.formBuilder.group({
      film: new FormControl('', Validators.required),
      cinema: new FormControl('', Validators.required),
      hall: new FormControl('', Validators.required),
      startDateTime: new FormControl('', Validators.required),
      time: new FormControl('', Validators.required),
      price: new FormControl('', [Validators.required, Validators.min(0)])
    });

    this.films$ = this.searchFilms.pipe(
      debounceTime(300),
      switchMap((title: string) => {
        return this.filmService.getFilmsByName(title);
      }),
    );
    this.cinemas$ = this.searchCinemas.pipe(
      debounceTime(300),
      switchMap((title: string) => {
        return this.cinemaService.getCinemasByName(title);
      }),
    );
    this.halls$ = this.searchHalls.pipe(
      switchMap((id: number) => {
        return this.cinemaService.getHallsByCinemaId(id);
      }),
    );
    this.hallTimeTable$ = this.searchHallTimeTable.pipe(
      switchMap((id: number) => {
        return this.showService.getShowsByHallId(id, this.showData.startDateTime);
      })
    );
  }

  startFilmSearch(filmTitle: string): void {
    this.searchFilms.next(filmTitle);
  }

  startCinemaSearch(cinemaName: string): void {
    this.searchCinemas.next(cinemaName);
  }

  startHallSearch(cinemaId: number): void {
    this.searchHalls.next(cinemaId);
  }

  startHallTimeTableSearch(hallId: number): void {
    this.searchHallTimeTable.next(hallId);
  }

  createShow(): void {
    this.showData.startDateTime = this.addShowInput.value.startDateTime;
    const time = this.addShowInput.value.time;
    this.showData.startDateTime.setHours(time.split(':')[0], time.split(':')[1]);
    this.showData.price = this.addShowInput.value.price;
    this.showService.createShow(this.showData).subscribe();
    this.snackbarService.displaySnackbar(SnackbarMessages.created);
    this.startHallTimeTableSearch(this.showData.hallId - 1);
    this.startHallTimeTableSearch(this.showData.hallId);
  }

  handleDataSet(event: MatDatepickerInputEvent<Date>): void {
    this.showData.startDateTime = event.value;
    if (this.showData.hallId) {
      this.startHallTimeTableSearch(this.showData.hallId);
      this.selectedDay = event.value.toDateString();
    }
  }

  handleStartHallSearch(cinemaId: number, event): void {
    if (event.isUserInput) {
      this.startHallSearch(cinemaId);
    }
  }

  transformDuration(duration: number, startDateTime: string): string {
    const date = new Date(Date.parse(startDateTime));
    const resultDate = new Date(date.setMinutes(date.getMinutes() + duration));
    const localHours = resultDate.getHours() - (resultDate.getTimezoneOffset() / 60);
    return ('0' + (localHours)).slice(-2) + ':' + ('0' + resultDate.getMinutes()).slice(-2);
  }

  setHallData(hallSize: number, hallId: number, event): void {
    if (event.isUserInput) {
      this.showData.freeSeats = hallSize;
      this.showData.hallId = hallId;
      if (this.showData.startDateTime) {
        this.startHallTimeTableSearch(this.showData.hallId);
        this.selectedDay = this.showData.startDateTime.toDateString();
      }
    }
  }

  setFilmId(filmId: number, event): void {
    if (event.isUserInput) {
      this.showData.filmId = filmId;
    }
  }
}
