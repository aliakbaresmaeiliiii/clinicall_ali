import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal, WritableSignal } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ShareService {
  storeProfileImg = new BehaviorSubject<string | null | any>(null);
  #http = inject(HttpClient);
  config = environment.apiEndPoint;

  getStoreProfileImg$: Observable<string | any> =
    this.storeProfileImg.asObservable();

  // loading
  private loading: WritableSignal<boolean> = signal(false);

  get isLoading() {
    return this.loading.asReadonly();
  }

  setLoading(state: boolean) {
    this.loading.set(state);
  }

  updateStoreProfileImg(newImgUrl: string): void {
    this.storeProfileImg.next(newImgUrl);
  }

  uploadImg(file: File) {
    const fileToUpload = file as File;
    const formData = new FormData();
    formData.append('file', fileToUpload, fileToUpload.name);
    return this.#http.post(`${this.config}admin/uploadImage`, formData);
  }
}
