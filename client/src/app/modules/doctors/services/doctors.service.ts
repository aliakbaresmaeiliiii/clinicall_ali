import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal, TransferState } from '@angular/core';
import { UserInfo } from 'os';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { DoctorsDTO, ReviewsDTO } from '../models/doctors';

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
  doctorInfo = signal<any>(null);

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

  getSpecialties(): Observable<{}> {
    return this.#http.get<string[]>(`${this.config}admin/getSpecialties`);
  }

  countDoctorClick(doctor_id: number): Observable<number> {
    return this.#http.post<number>(`${this.config}admin/countDoctorClick`, {
      doctor_id,
    });
  }

  addComment(comment: any): Observable<string> {
    return this.#http.post<string>(`${this.config}admin/addComment`, {
      comment,
    });
  }

  filterSpeciality(value: string): Observable<string> {
    return this.#http.post<string>(`${this.config}admin/filterSpeciality`, {
      value,
    });
  }

  insertReviews(dataReviews: ReviewsDTO): Observable<ReviewsDTO> {
    return this.#http.post<ReviewsDTO>(
      `${this.config}admin/insertReviews`,
      dataReviews
    );
  }
}
