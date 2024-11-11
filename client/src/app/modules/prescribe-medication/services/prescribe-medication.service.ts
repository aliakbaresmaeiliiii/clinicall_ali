import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class PrescribeMedicationService {
  http = inject(HttpClient);
  config = environment.apiEndPoint;

  // getMedic(): Observable<any> {
  //   return this.http.get<any>(this.apiUrl);
  // }

  addPrescriptionMedicne(formData: any): Observable<any[]> {  
    return this.http.post<any[]>(
      `${this.config}prescription-medicine`,
      formData
    );
  }

  getDrugData(): Observable<any> {
    return this.http.get(`${this.config}medications`);
  }

  getDiseases(): Observable<{}> {
    return this.http.get(`${this.config}getAllDiseases`);
  }

  getDiseaseSubcategories(disease_id: string): Observable<{}> {
    return this.http.get(`${this.config}getDiseaseSubcategories/${disease_id}`);
  }

  updateIsFavorite(
    medication_id: string | number,
    isFavorite: boolean
  ): Observable<any> {
    return this.http.put(
      `${this.config}medications/${medication_id}/favorite`,
      { isFavorite }
    );
  }
}
