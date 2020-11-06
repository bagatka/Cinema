import {Component, Output, EventEmitter, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';

import {Observable} from 'rxjs';

import {Filter} from '../Interfaces/filter';
import {Cinema} from '../Interfaces/cinema';

import {CinemaService} from '../Services/cinema.service';

@Component({
  selector: 'app-search-filters',
  templateUrl: './search-filters.component.html',
  styleUrls: ['./search-filters.component.css']
})
export class SearchFiltersComponent implements OnInit {

  @Output() applyFilter = new EventEmitter<Filter>();

  today = new Date();
  filter: Filter = {};
  cities$ = new Observable<string[]>();
  cinemas$ = new Observable<Cinema[]>();
  formGroup = new FormGroup({
    start: new FormControl(''),
    end: new FormControl(''),
    seats: new FormControl('', Validators.min(1))
  });

  constructor(private cinemaService: CinemaService) {
  }

  ngOnInit(): void {
    this.cities$ = this.cinemaService.getCinemasCities();
    this.cinemas$ = this.cinemaService.getCinemas();
  }

  addNewFilter(value: Filter): void {
    this.applyFilter.emit(value);
  }

  onCityChange(event): void {
    this.filter.city = event.value;
    this.addNewFilter(this.filter);
    this.cinemas$ = this.cinemaService.getCinemasByCity(this.filter.city);
  }

  onCinemaChange(event): void {
    this.filter.cinemaName = event.value;
    this.addNewFilter(this.filter);
  }

  onStartDateChange(value): void {
    this.filter.startDate = this.formateDate(value);
  }

  onEndDateChange(value): void {
    this.filter.endDate = this.formateDate(value);
    if (value) {
      this.addNewFilter(this.filter);
    }
  }

  onSeatsChange(value): void {
    this.filter.seats = value;
    if (value >= 1) {
      this.addNewFilter(this.filter);
    }
  }

  private formateDate(dateString: string): string | null {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = (1 + date.getMonth()).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');

    if (year && month && year) {
      return month + '/' + day + '/' + year;
    }
    return null;
  }
}
