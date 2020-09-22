import {Component, OnInit} from '@angular/core';

import {Observable, Subject} from 'rxjs';
import {distinctUntilChanged, switchMap} from 'rxjs/operators';

import {Filter} from '../filter';
import {Film} from '../film';
import {FilmService} from '../film.service';

@Component({
  selector: 'app-search-screen',
  templateUrl: './search-screen.component.html',
  styleUrls: ['./search-screen.component.css']
})
export class SearchScreenComponent implements OnInit {

  filmTitle = '';
  films$: Observable<Film[]>;
  private filter: Filter = {};
  private searchTerms = new Subject<Filter>();

  constructor(private filmService: FilmService) {
  }

  onFilterChange(filter: Filter): void {
    this.filter = filter;
    this.search();
  }

  onTitleChange(value): void {
    this.filmTitle = value;
    this.search();
  }

  search(): void {
    this.filter.filmTitle = this.filmTitle;
    this.searchTerms.next(this.filter);
  }

  ngOnInit(): void {
    this.films$ = this.searchTerms.pipe(
      distinctUntilChanged(),
      switchMap((filter: Filter) => this.filmService.searchFilmsByFilter(filter))
    );
  }
}
