import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

import {of, Observable} from 'rxjs';

import {Cinema} from './cinema';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CinemaService {

  private cinemasUrl = 'api/cinemas';

  getCinemas(): Observable<Cinema[]> {
    return this.http.get<Cinema[]>(this.cinemasUrl);
  }

  getCinemasCities(): string[] {
    const cities: string[] = [];
    this.getCinemas().pipe(
      map(cinemas => {
        for (const cinema of cinemas) {
          cities.push(cinema.city);
        }
      })
    );
    return cities;
  }

  searchCinemas(term: string): Observable<Cinema[]> {
    if (!term.trim()) {
      return of([]);
    }
    return this.http.get<Cinema[]>(`${this.cinemasUrl}/?title=${term}`);
  }

  constructor(private http: HttpClient) {
  }
}
