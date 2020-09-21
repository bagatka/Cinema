import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

import {Observable} from 'rxjs';

import {Cinema} from './cinema';

@Injectable({
  providedIn: 'root'
})
export class CinemaService {

  private cinemasUrl = 'api/cinemas';

  getCinemas(): Observable<Cinema[]> {
    return this.http.get<Cinema[]>(this.cinemasUrl);
  }

  getCinemasCities(): Observable<string[]> {
    return this.http.get<string[]>(`${this.cinemasUrl}/cities`);
  }

  getCinemasByCity(city: string): Observable<Cinema[]> {
    if (!city.trim()) {
      return this.getCinemas();
    }
    return this.http.get<Cinema[]>(`${this.cinemasUrl}/?city=${city}`);
  }

  constructor(private http: HttpClient) {
  }
}
