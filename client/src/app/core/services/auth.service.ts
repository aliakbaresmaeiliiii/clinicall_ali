import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import {
  CurrentUser,
  SignupResponse,
  TokenPermission,
  User,
} from '../auth/models/user';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { IPatient } from '../auth/models/IPatient';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  config = environment.apiEndPoint;
  #http = inject(HttpClient);
  router = inject(Router);
  tokenKey!: any;
  public permissions = new BehaviorSubject<TokenPermission[]>([]);

  constructor() {
    if (typeof localStorage !== 'undefined') {
      const userData = localStorage.getItem('userData');
      if (userData) {
        const getItem = JSON.parse(userData);
        this.tokenKey = getItem.token;
      }
    }
  }

  clinicRegister(userData: any): Observable<SignupResponse> {
    return this.#http.post<SignupResponse>(
      `${this.config}auth/clinic/register`,
      userData
    );
  }

  patientRegister(userData: any): Observable<SignupResponse> {
    return this.#http.post<SignupResponse>(
      `${this.config}auth/patient/register`,
      userData
    );
  }

  clinicSignIn(userData: any): Observable<any> {
    return this.#http.post<any>(`${this.config}auth/clinic-sign-in`, userData);
  }

  confirmClinicEmail(data: any): Observable<CurrentUser> {
    return this.#http.post<CurrentUser>(
      `${this.config}auth/verify-clinic-email`,
      data
    );
  }
  confirmPatientEmail(data: any): Observable<CurrentUser> {
    return this.#http.post<CurrentUser>(
      `${this.config}auth/verify-patient-email`,
      data
    );
  }

  doctorSignIn(userData: any): Observable<any> {
    return this.#http.post<any>(`${this.config}auth/doctor-sign-in`, userData);
  }
  patientSignIn(userData: IPatient): Observable<User> {
    return this.#http.post<User>(
      `${this.config}auth/patient-sign-in`,
      userData
    );
  }
  fetchConfirmCode(email: string): Observable<any> {
    const param = new HttpParams().set('email', email);
    return this.#http.get<User>(`${this.config}auth/verify-email-code`, {
      params: param,
    });
  }

  getToken(): string | null {
    const userData = localStorage.getItem('userData');
    if (userData) {
      const getItem = JSON.parse(userData);
      return getItem.token || null;
    }
    return null;
  }
  isAuthDataAvailable(): boolean {
    return !!this.getToken();
  }

  isTokenExpired(): boolean {
    const token = this.getToken();
    if (!token) return true;

    try {
      const decoded: any = jwtDecode(token);
      const currentTime = Math.floor(Date.now() / 1000);
      return decoded.exp < currentTime;
    } catch (error) {
      return true;
    }
  }

  // refreshToken(): Observable<string> {
  //   if (this.refreshTokenInProgress) {
  //     return this.refreshTokenSubject.pipe(
  //       filter(token => token !== null),
  //       take(1)
  //     );
  //   } else {
  //     this.refreshTokenInProgress = true;
  //     this.refreshTokenSubject.next(null);

  //     return this.#http
  //       .post<{ accessToken: string }>(`${this.config}auth/sign-in`, {
  //         refreshToken,
  //       })
  //       .pipe(
  //         map(response => {
  //           const newAccessToken = response.accessToken;
  //           this.refreshTokenInProgress = false;
  //           this.refreshTokenSubject.next(newAccessToken);
  //           return newAccessToken;
  //         }),
  //         catchError((error: HttpErrorResponse) => {
  //           this.refreshTokenInProgress = false;
  //           this.#cookieService.delete('authorized');
  //           this.#cookieService.delete('refreshToken');
  //           return throwError(() => new Error(error.message));
  //         })
  //       );
  //   }
  // }

  // getAllUsers(): Observable<Users> {
  //   return this.httpClient.get<Users>(`${this.config}/users`);
  // }

  isLoggedIn(): boolean {
    const token = localStorage.getItem('userData'); // or sessionStorage.getItem('token')
    return !!token; // Returns true if token exists, otherwise false
  }

  logout() {
    localStorage.removeItem('userData'); // Remove token
    this.router.navigate(['auth/login']); // Redirect to login
  }
}
