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
    return !!this.getToken();
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
    const token = localStorage.getItem('token');
    if (!token) {
      return null;
    }
    const tokenStatus = this.checkTokenExpired(token);
    if (!tokenStatus) {
      return null;
    }
    return token;
  }

  private checkTokenExpired(token: string): boolean {
    const expiry = (JSON.parse(atob(token.split('.')[1]))).exp;
    if ((Math.floor((new Date()).getTime() / 1000)) >= expiry) {
      this.deleteToken();
      return false;
    }
    return true;
  }

  private getDecodedTokenPayload(): JwtPayload {
    const jwtPayload = this.getToken()?.split(/\./)[1];
    if (!jwtPayload) {
      return null;
    }
    return JSON.parse(window.atob(jwtPayload));
  }
}
