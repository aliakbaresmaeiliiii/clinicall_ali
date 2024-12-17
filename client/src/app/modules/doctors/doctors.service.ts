import { HttpClient } from '@angular/common/http';
import { inject, Injectable, TransferState } from '@angular/core';
import { environment } from '../../environments/environment';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { DoctorsDTO } from './models/doctors';

@Injectable({
  providedIn: 'root',
})
export class DoctorsService {
  checkPhoneNumberExists(value: string | null): any {
    throw new Error('Method not implemented.');
  }
  #http = inject(HttpClient);
  config = environment.apiEndPoint;
  doctorImg = new BehaviorSubject<any>([]);
  doctorImg$ = this.doctorImg.asObservable();

  getDoctors(): Observable<DoctorsDTO[]> {
    return this.#http.get<DoctorsDTO[]>(`${this.config}admin/doctors`);
  }

  getMostPopularDoctor() {
    return this.#http.get<DoctorsDTO[]>(`${this.config}getMostPopularDoctor`);
  }

  addDoctor(formData: any): Observable<DoctorsDTO[]> {
    return this.#http.post<DoctorsDTO[]>(
      `${this.config}admin/add-doctor`,
      formData
    );
  }

  doctorDetial(id: number): Observable<DoctorsDTO[]> {
    return this.#http
      .get<{ data: DoctorsDTO[] }>(`${this.config}admin/doctor-detial/${id}`)
      .pipe(map(response => response.data));
  }

  getAddresses(): Observable<{ lat: number; lng: number }[]> {
    return this.#http.get<{ lat: number; lng: number }[]>(this.config);
  }

  uploadImgDoctor(file: File) {
    const fileToUpload = file as File;
    const formData = new FormData();
    formData.append('file', fileToUpload, fileToUpload.name);
    return this.#http.post(`${this.config}admin/uploadImage`, formData);
  }

  updateDoctor(formData: any): Observable<DoctorsDTO[]> {
    return this.#http.put<DoctorsDTO[]>(
      `${this.config}admin/updateDoctor`,
      formData
    );
  }

  getDoctorSpecialization(doctorId: number) {
    return this.#http
      .get<{ data: DoctorsDTO[] }>(
        `${this.config}admin/getDoctor-specialization/${doctorId}`
      )
      
  }
}
