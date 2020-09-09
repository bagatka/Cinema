import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

import {of, Observable} from 'rxjs';

import {Film} from './film';


@Injectable({
  providedIn: 'root'
})
export class FilmService {

  private filmsUrl = 'api/films';

  getFilms(): Observable<Film[]> {
    return this.http.get<Film[]>(this.filmsUrl);
  }

  searchFilms(term: string): Observable<Film[]> {
    if (!term.trim()) {
      return of([]);
    }
    return this.http.get<Film[]>(`${this.filmsUrl}/?title=${term}`);
  }

  constructor(private http: HttpClient) {
  }
}
