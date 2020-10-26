import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Observable, Subject} from 'rxjs';
import {Film} from '../../../Interfaces/film';
import {Cinema} from '../../../Interfaces/cinema';
import {Hall} from '../../../Interfaces/hall';
import {FilmService} from '../../../Services/film.service';
import {CinemaService} from '../../../Services/cinema.service';
import {debounceTime, switchMap} from 'rxjs/operators';

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
  hallTimeTable$ = new Observable();
  private searchFilms = new Subject<string>();
  private searchCinemas = new Subject<string>();

  constructor(
    private formBuilder: FormBuilder,
    private filmService: FilmService,
    private cinemaService: CinemaService
  ) {
  }

  ngOnInit(): void {
    this.addShowInput = this.formBuilder.group({
      film: new FormControl('', Validators.required),
      cinema: new FormControl('', Validators.required),
      hall: new FormControl('', Validators.required),
      dateTime: new FormControl('', Validators.required),
      time: new FormControl('', Validators.required)
    });

    this.films$ = this.searchFilms.pipe(
      debounceTime(300),
      switchMap((title: string) => {
        return this.filmService.searchFilmsByName(title);
      }),
    );
    this.cinemas$ = this.searchCinemas.pipe(
      debounceTime(300),
      switchMap((title: string) => {
        return this.cinemaService.searchCinemasByName(title);
      }),
    );
  }

  startFilmSearch(title: string): void {
    this.searchFilms.next(title);
  }

  startCinemaSearch(name: string): void {
    this.searchCinemas.next(name);
  }
}
