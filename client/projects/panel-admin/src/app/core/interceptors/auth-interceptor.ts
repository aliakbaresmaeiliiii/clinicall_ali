import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Observable, throwError } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { ErrorService } from '../../shared/client-services/error.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  #cookieService = inject(CookieService);
  toast = inject(ToastrService);
  authService = inject(AuthService);
  isRefreshing = false;
  errorService = inject(ErrorService);

  intercept(
    request: HttpRequest<any>,
    handler: HttpHandler
  ): Observable<HttpEvent<any>> {
    const getDataFromStorage = this.#cookieService.get('userData');

    if (getDataFromStorage) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${getDataFromStorage}`,
        },
      });
    }

    return handler.handle(request).pipe(
      catchError((err: HttpErrorResponse) => {
        switch (err.error.code) {
          case 404:
            this.errorService.handle404Error(err);
            break;
          case 401:
            this.errorService.handle401Error(err);
            break;
          default:
            break;
          }
          return throwError(() => new Error(err.message));
      })
    );
  }
}
