import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';

import {of, Observable} from 'rxjs';

import {Film} from './film';
import {Filter} from './filter';
import {ApiPaths, environment} from '../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class FilmService {

  private baseUrl = environment.baseUrl + ApiPaths.films;

  getFilms(): Observable<Film[]> {
    return this.http.get<Film[]>(this.baseUrl);
  }

  searchFilmsByName(term: string): Observable<Film[]> {
    if (!term.trim()) {
      return of([]);
    }
    return this.http.get<Film[]>(`${this.baseUrl}/?title=${term}`);
  }

  searchFilmsByFilter(filter: Filter): Observable<Film[]> {
    if (!filter) {
      return this.getFilms();
    }
    const options = {
      params: new HttpParams()
    };
    Object.keys(filter).forEach((key) => {
      options.params = options.params.set(key, filter[key]);
    });
    return this.http.get<Film[]>(this.baseUrl, options);
  }

  constructor(private http: HttpClient) {
  }
}
