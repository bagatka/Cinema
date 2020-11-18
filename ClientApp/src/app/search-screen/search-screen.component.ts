import {Component, OnInit, AfterViewInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

import {Observable, Subject} from 'rxjs';
import {debounceTime, switchMap} from 'rxjs/operators';

import {Filter} from '../Interfaces/filter';
import {Film} from '../Interfaces/film';

import {FilmService} from '../Services/film.service';

@Component({
  selector: 'app-search-screen',
  templateUrl: './search-screen.component.html',
  styleUrls: ['./search-screen.component.css']
})
export class SearchScreenComponent implements OnInit, AfterViewInit {

  filmTitle = '';
  films$: Observable<Film[]>;
  filter: Filter = {};
  private searchTerms = new Subject<Filter>();

  constructor(
    private filmService: FilmService,
    private route: ActivatedRoute,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.films$ = this.searchTerms.pipe(
      debounceTime(400),
      switchMap((filter: Filter) => this.filmService.getFilmsByFilter(filter))
    );
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.searchFromQuery();
    }, 0);
  }

  private searchFromQuery(): void {
    this.parseQuery();
    this.search();
  }

  onFilterChange(filter: Filter): void {
    this.filter = filter;
    this.updateQuery(false);
    this.search();
  }

  onTitleChange(value): void {
    this.filmTitle = value;
    this.updateQuery(false);
    this.search();
  }

  search(): void {
    this.filter.title = this.filmTitle;
    this.searchTerms.next(this.filter);
  }

  buyTickets(filmData): void {
    this.updateQuery(true, filmData.title, filmData.posterUrl);
  }

  private updateQuery(isOrder: boolean, filmTitle?: string, filmPosterUrl?: string): void {
    this.router.navigate(isOrder ? ['/order'] : [], {
      relativeTo: this.route,
      queryParams: {
        title: filmTitle ? filmTitle : this.filmTitle,
        city: this.filter.city,
        cinemaName: this.filter.cinemaName,
        seats: this.filter.seats > 0 ? this.filter.seats : null,
        startDate: this.filter.startDate,
        endDate: this.filter.endDate,
        posterUrl: filmPosterUrl ? filmPosterUrl : ''
      },
      skipLocationChange: false
    });
  }

  private parseQueryParameter(parameter: string): string {
    return this.route.snapshot.queryParamMap.get(parameter);
  }

  private parseQuery(): void {
    this.filmTitle = this.parseQueryParameter('title');
    this.filter.city = this.parseQueryParameter('city');
    this.filter.cinemaName = this.parseQueryParameter('cinemaName');
    this.filter.seats = Number(this.parseQueryParameter('seats'));
    this.filter.startDate = this.parseQueryParameter('startDate');
    this.filter.endDate = this.parseQueryParameter('endDate');
  }
}
