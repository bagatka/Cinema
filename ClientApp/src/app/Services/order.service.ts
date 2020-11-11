import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';

import {ApiPaths, environment} from '../../environments/environment';
import {Observable} from 'rxjs';
import {OrderDetails} from '../Interfaces/order-details';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private baseUrl = environment.baseUrl + ApiPaths.orders;

  constructor(private http: HttpClient) {
  }

  buy(details: OrderDetails): Observable<number> {
    return this.http.post<number>(`${this.baseUrl}/validate`, details);
  }
}
