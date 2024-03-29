import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { AuthenticationService } from '../services/authentication.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(private authService: AuthenticationService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(catchError(err => {
      if ([401, 403].includes(err.status)) {
        this.authService.logout()
      }

      return throwError(() => err)
    }))
  }
}
