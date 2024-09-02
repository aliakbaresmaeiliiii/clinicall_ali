// import {
//   HttpErrorResponse,
//   HttpEvent,
//   HttpHandler,
//   HttpInterceptor,
//   HttpRequest,
// } from '@angular/common/http';
// import { Injectable, NgZone, inject } from '@angular/core';
// import { Router } from 'express';
// import { Observable, catchError, throwError } from 'rxjs';
// import { COMMON_MESSAGES } from '../data/common-message.data';
// import { MatSnackBar } from '@angular/material/snack-bar';

import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable, catchError, throwError } from 'rxjs';
import { ErrorService } from '../client-services/error.service';

@Injectable()
export class GlobalHttpErrorHandler implements HttpInterceptor {
  snackBar = inject(MatSnackBar);
  isRefreshing = false;
  errorMessage: string = '';
  errorService = inject(ErrorService);

  intercept(
    req: HttpRequest<any>,
    handler: HttpHandler
  ): Observable<HttpEvent<any>> {
    return handler.handle(req).pipe(
      catchError(error => {
        if (error instanceof HttpErrorResponse) {
          switch (error.status) {
            case 400:
              this.errorService.handle400Error(error);
              break;
            case 401:
              this.errorService.handle401Error(error);
              break;
            case 404:
              this.errorService.handle404Error(error);
              break;
            case 422:
              this.errorService.handle422Error(error);
              break;
            case 500:
              this.errorService.handle500Error(error);
              break;
            default:
              break;
          }

          if (error.error instanceof ErrorEvent) {
            console.error('ErrorEvent occurred');
          }
        } else {
          console.error('Not HTTP error');
          console.error(error);
        }
        return throwError(() => new Error('test'));
      })
    );
  }
}
