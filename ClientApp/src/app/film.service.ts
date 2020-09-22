import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';

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
      return this.getFilms();
    }
    const options = {
      params: new HttpParams()
    };
    Object.keys(filter).forEach((key) => {
      options.params.append(key, filter[key]);
    });
    return this.http.get<Film[]>(this.filmsUrl, options);
  }

  constructor(private http: HttpClient) {
  }
}
