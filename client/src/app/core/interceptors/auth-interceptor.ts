import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ErrorService } from '../../shared/client-services/error.service';
import { AuthService } from '../services/auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  toast = inject(ToastrService);
  isRefreshing = false;
  errorService = inject(ErrorService);
  authService = inject(AuthService);

  intercept(
    request: HttpRequest<any>,
    handler: HttpHandler
  ): Observable<HttpEvent<any>> {
    const token = this.authService.getToken();
    let clonedRequest = request;
    if (token) {
      clonedRequest = request.clone({
        setHeaders: { Authorization: `Bearer ${token}` },
      });
    }

    return handler.handle(request).pipe(
      catchError((err: HttpErrorResponse) => {
        switch (err.status) {
          case 400:
            this.errorService.handle400Error(err);
            break;
          case 401:
            this.errorService.handle401Error(err);
            this.authService.logout();
            break;
          case 403:
            this.errorService.handle403Error(err);
            break;
          case 404:
            this.errorService.handle404Error(err);
            break;
          case 422:
            this.errorService.handle422Error(err);
            break;
          case 500:
            this.errorService.handle500Error(err);
            break;
          default:
            this.toast.error('An unexpected error occurred', 'Error');
            break;
        }
        return throwError(() => 'aliakbar');
      })
    );
  }
}
