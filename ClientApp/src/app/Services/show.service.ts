import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';

import {Observable, of} from 'rxjs';

import {Show} from '../Interfaces/show';
import {ShowForManipulation} from '../Interfaces/show-for-manipulation';
import {ShowParameters} from '../Interfaces/show-parameters';

import {ApiPaths, environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ShowService {

  private baseUrl = environment.baseUrl + ApiPaths.shows;

  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };

  constructor(private http: HttpClient) {
  }

  getShows(): Observable<Show[]> {
    return this.http.get<Show[]>(this.baseUrl);
  }

  getShowById(id: number): Observable<Show> {
    return this.http.get<Show>(this.baseUrl + `/${id}`);
  }

  getShowsByFilmTitle(term: string): Observable<Show[]> {
    if (!term.trim()) {
      return of([]);
    }
    return this.http.get<Show[]>(`${this.baseUrl}/?filmTitle=${term}`);
  }

  getShowsByHallId(id: number, date: Date): Observable<Show[]> {
    return this.http.get<Show[]>(`${this.baseUrl}?hallId=${id}&date=${this.formateDate(date)}`);
  }

  getShowsByParameters(showParameters: ShowParameters): Observable<Show[]> {
    if (!showParameters) {
      return this.getShows();
    }
    const options = {
      params: new HttpParams()
    };
    Object.keys(showParameters).forEach((key) => {
      options.params = options.params.set(key, showParameters[key]);
    });
    return this.http.get<Show[]>(this.baseUrl, options);
  }

  createShow(show: ShowForManipulation): Observable<Show> {
    return this.http.post<Show>(this.baseUrl, show, this.httpOptions);
  }

  deleteShow(id: number): Observable<Show> {
    return this.http.delete<Show>(this.baseUrl + `/${id}`);
  }

  updateShow(show: Show, id: number): Observable<Show> {
    return this.http.put<Show>(this.baseUrl + `/${id}`, show, this.httpOptions);
  }

  private formateDate(date: Date): string {
    const year = date.getFullYear();
    const month = (1 + date.getMonth()).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');

    return month + '/' + day + '/' + year;
  }
}
