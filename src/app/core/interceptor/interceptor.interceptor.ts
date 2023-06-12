import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class InterceptorInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    let TokenKey = localStorage.getItem('pizza-jwt-token');
    const req = request.clone({
      setHeaders: {
        Authorization: `Bearer ${TokenKey}`,
      },
    });
    return next.handle(req);
  }
}
