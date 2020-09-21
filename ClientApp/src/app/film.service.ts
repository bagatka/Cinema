import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

import {of, Observable} from 'rxjs';

import {Film} from './film';
import {Filter} from './filter';


@Injectable({
  providedIn: 'root'
})
export class FilmService {

  private filmsUrl = 'api/films';

  getFilms(): Observable<Film[]> {
    return this.http.get<Film[]>(this.filmsUrl);
  }

  searchFilmsByName(term: string): Observable<Film[]> {
    if (!term.trim()) {
      return of([]);
    }
    return this.http.get<Film[]>(`${this.filmsUrl}/?title=${term}`);
  }

  searchFilmsByFilter(filter: Filter): Observable<Film[]> {
    if (!filter) {
      return of([]);
    }
    let query = '';
    for (const prop in filter) {
      if (filter[prop]) {
        query += `${prop}=${filter[prop]}&`;
      }
    }
    return this.http.get<Film[]>(`${this.filmsUrl}/?${query.slice(0, -1)}`);
  }

  constructor(private http: HttpClient) {
  }
}
