import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SignalService {
  signalUserData = signal<any>('');

  setData(inputData: any) {
    console.log('set signal data');

    this.signalUserData.set(inputData);
  }

  getData() {
    console.log('get signal data');
    return this.signalUserData();
  }

  constructor() {}
}
