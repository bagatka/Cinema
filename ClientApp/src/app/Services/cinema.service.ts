import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

import {Observable, of} from 'rxjs';

import {Cinema} from '../Interfaces/cinema';
import {Hall} from '../Interfaces/hall';

import {ApiPaths, environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CinemaService {

  private baseUrl = environment.baseUrl + ApiPaths.cinemas;
  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };

  constructor(private http: HttpClient) {
  }

  getCinemas(): Observable<Cinema[]> {
    return this.http.get<Cinema[]>(this.baseUrl);
  }

  getCinemaById(id: number): Observable<Cinema> {
    return this.http.get<Cinema>(`${this.baseUrl}/${id}`);
  }

  getCinemasCities(): Observable<string[]> {
    return this.http.get<string[]>(`${this.baseUrl}/cities`);
  }

  getCinemasByCity(city: string): Observable<Cinema[]> {
    if (!city.trim()) {
      return this.getCinemas();
    }
    return this.http.get<Cinema[]>(`${this.baseUrl}/?city=${city}`);
  }

  getCinemasByName(name: string): Observable<Cinema[]> {
    if (!name.trim()) {
      return of([]);
    }
    return this.http.get<Cinema[]>(`${this.baseUrl}/?name=${name}`);
  }

  getHallsByCinemaId(id: number): Observable<Hall[]> {
    return this.http.get<Hall[]>(`${this.baseUrl}/${id}/halls`);
  }

  createCinema(cinema: Cinema): Observable<Cinema> {
    return this.http.post<Cinema>(this.baseUrl, cinema, this.httpOptions);
  }

  deleteCinema(id: number): Observable<Cinema> {
    return this.http.delete<Cinema>(this.baseUrl + `/${id}`);
  }

  updateCinema(cinema: Cinema, id: number): Observable<Cinema> {
    return this.http.put<Cinema>(this.baseUrl + `/${id}`, cinema, this.httpOptions);
  }
}
