import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

import {Observable} from 'rxjs';

import {ApiPaths, environment} from '../../environments/environment';

import {Hall} from '../Interfaces/hall';

@Injectable({
  providedIn: 'root'
})
export class HallService {

  private baseUrl = environment.baseUrl + ApiPaths.halls;

  constructor(private http: HttpClient) {
  }

  getHallById(id: number): Observable<Hall> {
    return this.http.get<Hall>(this.baseUrl + `/${id}`);
  }
}
