import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { ProgressBarService } from '../../shared/client-services/progress-bar.service';
@Injectable({
  providedIn: 'root',
})
export class ProgressBarInterceptor implements HttpInterceptor {
  private progressBarService = inject(ProgressBarService);
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    this.progressBarService.start();
    return next.handle(req).pipe(
      finalize(() => {
        this.progressBarService.complete();
      })
    );
  }
}
