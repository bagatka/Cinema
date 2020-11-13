import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

import {ApiPaths, environment} from '../../environments/environment';
import {Observable} from 'rxjs';
import {OrderDetails} from '../Interfaces/order-details';
import {Order} from '../Interfaces/order';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private baseUrl = environment.baseUrl + ApiPaths.orders;

  constructor(private http: HttpClient) {
  }

  getUserOrders(active: boolean): Observable<Order[]> {
    return this.http.get<Order[]>(`${this.baseUrl}/?active=${active}`);
  }

  buy(details: OrderDetails): Observable<number> {
    return this.http.post<number>(`${this.baseUrl}/validate`, details);
  }
}
