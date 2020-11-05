import {Injectable} from '@angular/core';

import {JwtPayload} from '../Interfaces/jwt-payload';

@Injectable({
  providedIn: 'root'
})
export class JWTService {

  setToken(token: string): void {
    if (token) {
      localStorage.setItem('token', token);
    }
  }

  isTokenSet(): boolean {
    return !!localStorage.getItem('token');
  }

  deleteToken(): void {
    localStorage.removeItem('token');
  }

  getUserName(): string {
    return this.getDecodedTokenPayload()?.userName;
  }

  getUserId(): number {
    return this.getDecodedTokenPayload()?.sub;
  }

  getUserRole(): string {
    return this.getDecodedTokenPayload()?.role;
  }

  getUserEmail(): string {
    return this.getDecodedTokenPayload()?.email;
  }

  getToken(): string {
    return localStorage.getItem('token');
  }

  private getDecodedTokenPayload(): JwtPayload {
    const jwtPayload = this.getToken()?.split(/\./)[1];
    if (!jwtPayload) {
      return null;
    }
    return JSON.parse(window.atob(jwtPayload));
  }
}
