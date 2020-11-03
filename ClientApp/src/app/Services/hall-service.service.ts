import { Injectable } from '@angular/core';
import {ApiPaths, environment} from '../../environments/environment';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {Service} from '../Interfaces/service';
import {HallService} from '../Interfaces/hall-service';

@Injectable({
  providedIn: 'root'
})

// TODO: Rename service.
export class HallServiceService {

  private baseUrl = environment.baseUrl + ApiPaths.services;

  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };

  constructor(private http: HttpClient) {
  }

  getServices(): Observable<Service[]> {
    return this.http.get<Service[]>(this.baseUrl);
  }

  getServiceById(id: number): Observable<Service> {
    return this.http.get<Service>(this.baseUrl + `/${id}`);
  }

  getServiceByName(term: string): Observable<Service[]> {
    if (!term.trim()) {
      return of([]);
    }
    return this.http.get<Service[]>(`${this.baseUrl}/?name=${term}`);
  }

  createService(service: Service): Observable<Service> {
    return this.http.post<Service>(this.baseUrl, service, this.httpOptions);
  }

  deleteService(id: number): Observable<Service> {
    return this.http.delete<Service>(this.baseUrl + `/${id}`);
  }

  updateService(service: Service, id: number): Observable<Service> {
    return this.http.put<Service>(this.baseUrl + `/${id}`, service, this.httpOptions);
  }

  getHallServices(): Observable<HallService[]> {
    return this.http.get<HallService[]>(`${this.baseUrl}/hall`);
  }

  getHallServiceByHallId(hallId): Observable<HallService> {
    return this.http.get<HallService>(`${this.baseUrl}/hall/${hallId}`);
  }
}
