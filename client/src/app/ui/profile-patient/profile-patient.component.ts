import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-profile-patient',
    imports: [],
    templateUrl: './profile-patient.component.html',
    styleUrl: './profile-patient.component.scss'
})
export class ProfilePatientComponent implements OnInit{
  isHovered: boolean = false;
  userData: string = '';

  ngOnInit(): void {
    if (typeof localStorage !== 'undefined') {
      const getStoreItem = localStorage.getItem('userData');
      if (getStoreItem) {
        const getItem = JSON.parse(getStoreItem);
        this.userData = getItem.userName;
      }
    }
  }

  onMouseEnter() {
    this.isHovered = true;
  }

  onMouseLeave() {
    this.isHovered = false;
  }
}
