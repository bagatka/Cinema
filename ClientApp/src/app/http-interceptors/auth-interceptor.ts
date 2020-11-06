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
    let authReq = req;

    if (jwtToken) {
      authReq = req.clone({
        headers: req.headers.set('Authorization', `Bearer ${jwtToken}`)
      });
    }

    console.log(authReq);

    return next.handle(authReq);
  }
}
