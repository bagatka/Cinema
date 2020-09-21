import {Component, Output, EventEmitter, OnInit} from '@angular/core';
import {Filter} from '../filter';

@Component({
  selector: 'app-search-filters',
  templateUrl: './search-filters.component.html',
  styleUrls: ['./search-filters.component.css']
})
export class SearchFiltersComponent {

  @Output() filters: Filter;

  cities = [
    'Minsk',
    'Brest'
  ];

  cinemas = [
    'Silver Screen',
    'GoldScreen'
  ];

  selectCity(event: Event): void {
    this.filters.city = (event.target as HTMLSelectElement).value;
  }

  selectCinema(event: Event): void {
    this.filters.cinemaName = (event.target as HTMLSelectElement).value;
  }

  OnInit(): void{
  }
}
