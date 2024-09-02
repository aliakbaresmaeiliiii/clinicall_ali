import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, delay, of } from 'rxjs';
import { environment } from '../../../environments/environment';
import { PatientDTO } from '../../patients/model/patients.model';

@Injectable({
  providedIn: 'root',
})
export class CustomersService {
  #http = inject(HttpClient);

  constructor() {}



  getSkills() {
    return of(['Angular', 'Typescript', 'git', 'docker']).pipe(delay(1000));
  }


}
