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
    start: new FormControl(null),
    end: new FormControl(null),
    sits: new FormControl(null, Validators.min(1))
  });

  constructor(private cinemaService: CinemaService) {
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
    this.filter.startDate = value;
  }

  onEndDateChange(value): void {
    this.filter.endDate = value;
    this.addNewFilter(this.filter);
  }

  onSitsChange(value): void {
    this.filter.seats = value;
    if (value >= 1) {
      this.addNewFilter(this.filter);
    }
  }

  ngOnInit(): void {
    this.cities$ = this.cinemaService.getCinemasCities();
    this.cinemas$ = this.cinemaService.getCinemas();
  }
}
