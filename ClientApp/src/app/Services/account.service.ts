import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

import {RegisterRequest} from '../Interfaces/register-request';
import {LoginResponse} from '../Interfaces/login-response';
import {LoginRequest} from '../Interfaces/login-request';

import {JWTService} from './jwt.service';

import {ApiPaths, environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  private baseUrl = environment.baseUrl + ApiPaths.account;
  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };

  constructor(
    private http: HttpClient,
    private JwtService: JWTService
  ) {
  }

  register(requestBody: RegisterRequest): void {
    this.http.post<LoginResponse>(`${this.baseUrl}/register`, requestBody, this.httpOptions).subscribe(
      (res) => {
        if (res.succeeded) {
          this.JwtService.setToken(res.data.JWToken);
        }
      }
    );
  }

  login(requestBody: LoginRequest): void {
    this.http.post<LoginResponse>(`${this.baseUrl}/login`, requestBody, this.httpOptions).subscribe(
      (res) => {
        if (res.succeeded) {
          this.JwtService.setToken(res.data.JWToken);
        }
      }
    );
  }

  logout(): void {
    this.JwtService.deleteToken();
  }

  getEmail(): string {
    return this.JwtService.getUserEmail();
  }

  getUserName(): string {
    return this.JwtService.getUserName();
  }

  getRole(): string {
    return this.JwtService.getUserRole();
  }

  getId(): number {
    return this.JwtService.getUserId();
  }
}
