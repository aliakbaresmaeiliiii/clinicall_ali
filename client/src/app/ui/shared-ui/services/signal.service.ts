import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SignalService {
  signalUserData = signal<any>('');

  setData(inputData: any) {
    this.signalUserData.set(inputData);
  }

  getData() {
    return this.signalUserData();
  }

  constructor() {}
}
