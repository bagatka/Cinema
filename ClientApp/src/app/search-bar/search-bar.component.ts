import {Component, OnInit} from '@angular/core';
import {FormControl} from '@angular/forms';

import {Observable, Subject} from 'rxjs';
import {debounceTime, distinctUntilChanged, switchMap} from 'rxjs/operators';

import {FilmService} from '../Services/film.service';
import {Film} from '../Interfaces/film';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent implements OnInit {

  myControl = new FormControl();
  private searchTerms = new Subject<string>();
  results$: Observable<Film[]>;

  search(term: string): void {
    this.searchTerms.next(term);
  }

  constructor(private filmService: FilmService) {
  }

  ngOnInit(): void {
    this.results$ = this.searchTerms.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((value: string) => this.filmService.searchFilmsByName(value))
    );
  }
}
