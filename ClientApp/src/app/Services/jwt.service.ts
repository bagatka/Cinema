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

  deleteToken(): void {
    localStorage.removeItem('token');
  }

  getUserName(): string {
    return this.getDecodedTokenPayload().userName;
  }

  getUserId(): number {
    return this.getDecodedTokenPayload().sub;
  }

  getUserRole(): string {
    return this.getDecodedTokenPayload().role;
  }

  getUserEmail(): string {
    return this.getDecodedTokenPayload().email;
  }

  private getDecodedTokenPayload(): JwtPayload {
    const jwtPayload = localStorage.getItem('token').split(/\./)[1];
    return JSON.parse(window.atob(jwtPayload));
  }
}
