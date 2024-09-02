import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import {
  AbstractControl,
  AsyncValidator,
  ValidationErrors,
} from '@angular/forms';
import { Observable, catchError, map, of } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UniqueNicknameValidator implements AsyncValidator {
  #http = inject(HttpClient);
  config = environment.apiEndPoint;

  validate(
    control: AbstractControl<any, any>
  ): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> {
    return this.#http
      .get<unknown[]>(
        `${environment.apiEndPoint}user/checkNickName/${control.value}`
      )
      .pipe(
        map(users =>
          users.length === 0 ? null : { uniqueName: { isTaken: true } }
        ),
        catchError(() => of({ uniqueName: { unknownError: true } }))
      );
  }
}
