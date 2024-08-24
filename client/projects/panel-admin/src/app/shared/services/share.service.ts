import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShareService {
   storeProfileImg = new BehaviorSubject<string | null | any>(null);
  // Expose the observable, not the subject
  getStoreProfileImg$: Observable<string | any> = this.storeProfileImg.asObservable();



  updateStoreProfileImg(newImgUrl: string): void {
    this.storeProfileImg.next(newImgUrl);
  }
}
