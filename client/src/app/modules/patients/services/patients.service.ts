import { HttpClient, HttpEvent, HttpRequest } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { PatientDTO } from '../model/patients.model';

@Injectable({
  providedIn: 'root',
})
export class PatientsService {
  #http = inject(HttpClient);
  config = environment.apiEndPoint;


  upload(file: File): Observable<HttpEvent<any>> {
    const formData: FormData = new FormData();

    formData.append('file', file);

    const req = new HttpRequest('POST', `${this.config}/upload`, formData, {
      reportProgress: true,
      responseType: 'json',
    });

    return this.#http.request(req);
  }
  getFiles(): Observable<any> {
    return this.#http.get(`${this.config}/files`);
  }

  // getDataByEmail(email: string): Observable<string> {
  //   return this.#http.post<string>(`${this.config}getPatientInfo`, email);
  // }
  getPatients(): Observable<PatientDTO[]> {
    return this.#http.get<PatientDTO[]>(
      `${environment.apiEndPoint}api/patients`
    );
  }
  patientDetial(id: number) {
    return this.#http
      .get<{ data: PatientDTO[] }>(`${this.config}admin/patient-detial/${id}`)
      .pipe(map(response => response.data));
    // Extract the array from the response
  }
  checkPhoneNumberExists(phone: string | unknown): Observable<boolean> {
    return this.#http.get<boolean>(`${this.config}check-phone/${phone}`);
  }
  addPatient(formData: PatientDTO): Observable<PatientDTO[]> {
    return this.#http.post<PatientDTO[]>(
      `${this.config}admin/add-patient`,
      formData
    );
  }

  updatePatient(formData: PatientDTO): Observable<PatientDTO[]> {
    return this.#http.put<PatientDTO[]>(
      `${this.config}admin/updatePatient`,
      formData
    );
  }
  deletePatient(id: number | undefined): Observable<number> {
    return this.#http.delete<number>(
      `${this.config}/admin/deletePatient/${id}`
    );
  }
}
