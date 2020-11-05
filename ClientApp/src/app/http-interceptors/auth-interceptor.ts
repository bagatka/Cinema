import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';

import {Observable} from 'rxjs';

import {JWTService} from '../Services/jwt.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(
    private jwtService: JWTService
  ) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const jwtToken = this.jwtService.getToken();

    const authReq = req.clone({setHeaders: {Authorization: jwtToken ? jwtToken : ''}});

    return next.handle(authReq);
  }
}
