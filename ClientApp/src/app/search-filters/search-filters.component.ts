<<<<<<< HEAD
import {Component, Output, EventEmitter} from '@angular/core';
import {Filter} from '../filter';
=======
import { Component, OnInit } from '@angular/core';
>>>>>>> 818ef25c5f4f86fab4c6a7212b847ac52c014a93

@Component({
  selector: 'app-search-filters',
  templateUrl: './search-filters.component.html',
  styleUrls: ['./search-filters.component.css']
})
<<<<<<< HEAD
export class SearchFiltersComponent {

  @Output() filters: Filter;

  selectCity(event: Event): void {
    this.filters.city = (event.target as HTMLSelectElement).value;
  }

  selectCinemaName(event: Event): void {
    this.filters.cinemaName = (event.target as HTMLSelectElement).value;
  }



=======
export class SearchFiltersComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

>>>>>>> 818ef25c5f4f86fab4c6a7212b847ac52c014a93
}
