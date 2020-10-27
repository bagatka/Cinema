import { Injectable } from '@angular/core';
import {ApiPaths, environment} from '../../environments/environment';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {Filter} from '../Interfaces/filter';
import {Show} from '../Interfaces/show';

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
  /*searchShowsByFilter(filter: Filter): Observable<Show[]> {
    if (!filter) {
      return this.getShows();
    }
    const options = {
      params: new HttpParams()
    };
    Object.keys(filter).forEach((key) => {
      options.params = options.params.set(key, filter[key]);
    });
    return this.http.get<Show[]>(this.baseUrl, options);
  }*/

  createShow(show: Show): Observable<Show> {
    return this.http.post<Show>(this.baseUrl, show, this.httpOptions);
  }

  deleteShow(id: number): Observable<Show> {
    return this.http.delete<Show>(this.baseUrl + `/${id}`);
  }

  updateShow(show: Show, id: number): Observable<Show> {
    return this.http.put<Show>(this.baseUrl + `/${id}`, show, this.httpOptions);
  }
}
