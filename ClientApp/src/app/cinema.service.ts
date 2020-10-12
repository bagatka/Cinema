import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

import {Observable} from 'rxjs';

import {Cinema} from './Interfaces/cinema';
import {ApiPaths, environment} from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CinemaService {

  private baseUrl = environment.baseUrl + ApiPaths.cinemas;

  getCinemas(): Observable<Cinema[]> {
    return this.http.get<Cinema[]>(this.baseUrl);
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

  constructor(private http: HttpClient) {
  }
}
