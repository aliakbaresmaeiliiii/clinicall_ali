import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { CurrentUser, SignupResponse, TokenPermission, User } from '../auth/models/user';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  config = environment.apiEndPoint;
  #http = inject(HttpClient);
  tokenKey!: any;
  public permissions = new BehaviorSubject<TokenPermission[]>([]);

  constructor() {
    if (typeof localStorage !== 'undefined') {
      this.tokenKey = localStorage.getItem('tokenKey');
    }
  }

  clinicRegister(userData: any): Observable<SignupResponse> {
    return this.#http.post<SignupResponse>(
      `${this.config}auth/clinic/register`,
      userData
    );
  }

  clinicSignIn(userData: any): Observable<any> {
    return this.#http.post<any>(`${this.config}auth/clinic-sign-in`, userData);
  }

  confirmEmail(data: any): Observable<CurrentUser> {
    return this.#http.post<CurrentUser>(`${this.config}auth/verify-clinic-email`, data);
  }



  doctorSignIn(userData: any): Observable<any> {
    return this.#http.post<any>(`${this.config}auth/doctor-sign-in`, userData);
  }
  patientSignIn(userData: User): Observable<User> {
    return this.#http.post<User>(
      `${this.config}auth/patient-sign-in`,
      userData
    );
  }
  fetchConfirmCode(email: string): Observable<any> {
    const param = new HttpParams().set('email', email);
    return this.#http.get<User>(
      `${this.config}auth/verify-email-code`,{
        params:param
      }
    );
  }

  logout() {}

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }
  isAuthDataAvailable(): boolean {
    return !!this.getToken();
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
}
