import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import {
  DoctorScheduleAvailability,
  DoctorsDTO,
  ReviewsDTO,
} from '../models/doctors';
import { InsurancesDTO } from '../models/insureances';

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
  getSubSpecialtiesById(specialtyId: number): Observable<{}> {
    return this.#http.get<string[]>(
      `${this.config}get-sub-specialties/${specialtyId}`
    );
  }

  countDoctorClick(id: number): Observable<number> {
    return this.#http.post<number>(`${this.config}admin/countDoctorClick`, {
      id,
    });
  }

  addComment(comment: any): Observable<string> {
    return this.#http.post<string>(`${this.config}admin/addComment`, {
      comment,
    });
  }

  filterSpecialtyById(id: string): Observable<string> {
    return this.#http.get<string>(
      `${this.config}admin/filterSpecialtyById/${id}`
    );
  }

  filterServicesById(id: string): Observable<string> {
    return this.#http.get<string>(
      `${this.config}admin/filterServicesById/${id}`
    );
  }

  insertReviews(dataReviews: ReviewsDTO): Observable<ReviewsDTO> {
    return this.#http.post<ReviewsDTO>(
      `${this.config}admin/insertReviews`,
      dataReviews
    );
  }
  getReviews(): Observable<ReviewsDTO> {
    return this.#http.get<ReviewsDTO>(`${this.config}getReviews`);
  }

  getClinicServices(): Observable<any> {
    return this.#http.get<any>(`${this.config}getClinicServices`);
  }

  getAllCities(): Observable<any> {
    return this.#http.get<any>(`${this.config}getAllCities`);
  }

  filteredNeighbor(city_id: number): Observable<any> {
    return this.#http.get<any>(`${this.config}filtered_neighbor/${city_id}`);
  }

  getAllInsurances(): Observable<InsurancesDTO> {
    return this.#http.get<InsurancesDTO>(`${this.config}getAllInsurances`);
  }
}
