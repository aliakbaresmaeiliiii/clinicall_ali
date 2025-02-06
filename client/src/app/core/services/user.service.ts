import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { CurrentUser, User } from '../auth/models/user';
import { UserInfo } from '../../shared/models/userInfo';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  #http = inject(HttpClient);
  userEmail = new BehaviorSubject<any>('');
  storeEmail$ = this.userEmail.asObservable();
  private config = environment.apiEndPoint;
  isEducator = new BehaviorSubject<boolean>(false);
  users$ = this.#http.get<UserInfo[]>(
    `https://jsonplaceholder.typicode.com/users`
  );

  getUserInfo(email: string): Observable<UserInfo> {
    return this.#http.get<UserInfo>(`${this.config}getUserInfo/${email}`);
  }

  checkRoles(roles: string[]) {
    const acceptableRoles = [
      'Educator',
      'HOD',
      'Institution Administrator',
      'Account Administrator',
      'Director',
      'Curriculum Director',
      'Account Curriculum Director',
      'Account Director',
      'Homeroom Educator',
    ];
    acceptableRoles.forEach(role => {
      if (roles.includes(role)) {
        this.isEducator.next(true);
        return;
      }
    });
  }

  profile(id: string | number) {
    return this.#http.get<UserInfo>(
      `https://jsonplaceholder.typicode.com/users/${id}`
    );
  }


  getOTP(email: string): Observable<CurrentUser> {
    return this.#http.get<CurrentUser>(`${this.config}user/getOTP/${email}`);
  }

  updateProfile(data: any): Observable<User> {
    return this.#http.put<User>(`${this.config}user/updateProfile`, data);
  }

  forgetPassword(email: any): Observable<{}> {
    return this.#http.get(`${this.config}user/forgot-passsword/${email}`);
  }
}
