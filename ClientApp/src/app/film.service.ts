import {Injectable} from '@angular/core';
import {of, Observable} from 'rxjs';
import {Film} from './film';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FilmService {

  private filmsUrl = 'api/films';

  getFilms(): Observable<Film[]> {
    return this.http.get<Film[]>(this.filmsUrl);
  }

  getFilm(id: number): Observable<Film> {
    const url = `${this.filmsUrl}/${id}`;
    return this.http.get<Film>(url);
  }

  searchFilms(term: string): Observable<Film[]> {
    if (!term.trim()) {
      return of([]);
    }
    return this.http.get<Film[]>(`${this.filmsUrl}/?filmName=${term}`);
  }

  constructor(private http: HttpClient) {
  }
}
