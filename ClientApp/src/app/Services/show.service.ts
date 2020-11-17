import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';

import {Observable} from 'rxjs';

import * as moment from 'moment';

import {Show} from '../Interfaces/show';
import {ShowForManipulation} from '../Interfaces/show-for-manipulation';
import {ShowParameters} from '../Interfaces/show-parameters';

import {ApiPaths, environment} from '../../environments/environment';
import {SeatPosition} from '../Interfaces/seat-position';
import {TypePrice} from '../Interfaces/type-price';

@Injectable({
  providedIn: 'root'
})
export class ShowService {

  private baseUrl = environment.baseUrl + ApiPaths.shows;

  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };

  constructor(
    private http: HttpClient
  ) {
  }

  getShows(): Observable<Show[]> {
    return this.http.get<Show[]>(this.baseUrl);
  }

  getShowById(id: number): Observable<Show> {
    return this.http.get<Show>(this.baseUrl + `/${id}`);
  }

  getShowsByHallId(id: number, date: Date): Observable<Show[]> {
    return this.http.get<Show[]>(`${this.baseUrl}?hallId=${id}&date=${moment(date).format('L')}`);
  }

  getShowsByParameters(showParameters: ShowParameters): Observable<Show[]> {
    if (!showParameters) {
      return this.getShows();
    }
    const options = {
      params: new HttpParams()
    };
    Object.keys(showParameters).forEach((key) => {
      if (!!showParameters[key] || showParameters[key] === 0) {
        options.params = options.params.set(key, showParameters[key]);
      }
    });
    return this.http.get<Show[]>(this.baseUrl, options);
  }

  getSoldSeatsByShowId(showId: number): Observable<SeatPosition[]> {
    return this.http.get<SeatPosition[]>(`${this.baseUrl}/${showId}/seats/sold`);
  }

  getSeatPricesByShowId(showId: number): Observable<TypePrice[]> {
    return this.http.get<TypePrice[]>(`${this.baseUrl}/${showId}/seats/prices`);
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
}
