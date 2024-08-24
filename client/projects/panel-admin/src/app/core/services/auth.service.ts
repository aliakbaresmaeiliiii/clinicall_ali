import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, Observable, catchError, throwError } from 'rxjs';
import { Register, SignupResponse, TokenPermission, User } from '../auth/models/user';
import { environment } from '../../environments/environment';
import { CookieService } from 'ngx-cookie-service';
import { filter, take, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  config = environment.apiEndPoint;
  #http = inject(HttpClient);
  tokenKey!: any;
  #cookieService = inject(CookieService);
  public permissions = new BehaviorSubject<TokenPermission[]>([]);

  private refreshTokenInProgress = false;
  private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(
    null
  );

  constructor() {
    if (typeof localStorage !== 'undefined') {
      this.tokenKey = localStorage.getItem('tokenKey');
    }
  }

  signIn(userData: User): Observable<User> {
    return this.#http.post<User>(`${this.config}auth/sign-in`, userData);
  }

  signUp(userData: any): Observable<SignupResponse> {
    return this.#http.post<SignupResponse>(
      `${this.config}auth/sign-up`,
      userData
    );
  }

  logout() {
    // Implement logout logic, like removing cookies, clearing local storage, etc.
    this.#cookieService.delete('authorized');
    this.#cookieService.delete('refreshToken');
    // Additional logic to navigate to login page or show a message
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }
  isAuthDataAvailable(): boolean {
    return !!this.getToken();
  }

  refreshToken(): Observable<string> {
    if (this.refreshTokenInProgress) {
      return this.refreshTokenSubject.pipe(
        filter(token => token !== null),
        take(1)
      );
    } else {
      this.refreshTokenInProgress = true;
      this.refreshTokenSubject.next(null);

      const refreshToken = this.#cookieService.get('refreshToken');
      return this.#http
        .post<{ accessToken: string }>(`${this.config}auth/sign-in`, {
          refreshToken,
        })
        .pipe(
          map(response => {
            const newAccessToken = response.accessToken;
            this.refreshTokenInProgress = false;
            this.refreshTokenSubject.next(newAccessToken);
            return newAccessToken;
          }),
          catchError((error: HttpErrorResponse) => {
            this.refreshTokenInProgress = false;
            this.#cookieService.delete('authorized');
            this.#cookieService.delete('refreshToken');
            return throwError(() => new Error(error.message));
          })
        );
    }
  }

 
  // getAllUsers(): Observable<Users> {
  //   return this.httpClient.get<Users>(`${this.config}/users`);
  // }
}
