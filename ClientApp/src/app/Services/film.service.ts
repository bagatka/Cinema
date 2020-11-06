import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';

import {of, Observable} from 'rxjs';

import {Film} from '../Interfaces/film';
import {Filter} from '../Interfaces/filter';

import {ApiPaths, environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FilmService {

  private baseUrl = environment.baseUrl + ApiPaths.films;

  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };

  constructor(private http: HttpClient) {
  }

  getFilms(): Observable<Film[]> {
    return this.http.get<Film[]>(this.baseUrl);
  }

  getFilmById(id: number): Observable<Film> {
    return this.http.get<Film>(this.baseUrl + `/${id}`);
  }

  getFilmsByName(term: string): Observable<Film[]> {
    if (!term.trim()) {
      return of([]);
    }
    return this.http.get<Film[]>(`${this.baseUrl}/?title=${term}`);
  }

  getFilmsByFilter(filter: Filter): Observable<Film[]> {
    if (!filter) {
      return this.getFilms();
    }
    const options = {
      params: new HttpParams()
    };
    Object.keys(filter).forEach((key) => {
      if (filter[key]) {
        options.params = options.params.set(key, filter[key]);
      }
    });
    return this.http.get<Film[]>(this.baseUrl, options);
  }

  createFilm(film: Film): Observable<Film> {
    return this.http.post<Film>(this.baseUrl, film, this.httpOptions);
  }

  deleteFilm(id: number): Observable<Film> {
    return this.http.delete<Film>(this.baseUrl + `/${id}`);
  }

  updateFilm(film: Film, id: number): Observable<Film> {
    return this.http.put<Film>(this.baseUrl + `/${id}`, film, this.httpOptions);
  }
}
