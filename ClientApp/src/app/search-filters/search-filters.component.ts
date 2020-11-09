import {Component, Output, EventEmitter, OnInit, Input, ViewChild} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';

import {Observable} from 'rxjs';

import {Filter} from '../Interfaces/filter';
import {Cinema} from '../Interfaces/cinema';

import {CinemaService} from '../Services/cinema.service';
import {MatInput} from '@angular/material/input';

@Component({
  selector: 'app-search-filters',
  templateUrl: './search-filters.component.html',
  styleUrls: ['./search-filters.component.css']
})
export class SearchFiltersComponent implements OnInit {

  @Output() applyFilter = new EventEmitter<Filter>();
  @Input() filterHistory: Filter;
  @ViewChild('startDateInput') startDateInput: MatInput;
  @ViewChild('endDateInput') endDateInput: MatInput;

  today = new Date();
  filter: Filter = {};
  cities$ = new Observable<string[]>();
  cinemas$ = new Observable<Cinema[]>();
  formGroup: FormGroup;

  constructor(private cinemaService: CinemaService) {
  }

  ngOnInit(): void {
    if (this.filterHistory) {
      this.filter = this.filterHistory;
    }
    let startDate = null;
    let endDate = null;
    if (this.filter?.startDate) {
      startDate = new Date(this.filter.startDate);
    }
    if (this.filter?.endDate) {
      endDate = new Date(this.filter.endDate);
    }
    this.formGroup = new FormGroup({
      start: new FormControl(startDate),
      end: new FormControl(endDate),
      seats: new FormControl(this.filter?.seats, Validators.min(1))
    });
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
