import { Component, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DilogDotorAppointmentComponent } from './dilog-dotor-appointment/dilog-dotor-appointment.component';

@Component({
  selector: 'app-get-doctor-apointment',
  standalone: false,
  templateUrl: './get-doctor-apointment.component.html',
  styleUrl: './get-doctor-apointment.component.scss',
})
export class GetDoctorApointmentComponent {
  dialog = inject(MatDialog);

  briefText: string =
    'Has a specialized board for diseases of infants and children, treatment of digestive and allergic disorders...';
  fullText: string = `
  Has a specialized board for diseases of infants and children,
  treatment of digestive and allergic disorders of infants and
  children, growth and development disorders of infants and children,
  growth and maturation disorders of adolescents in the office of
  abdominal ultrasound, milk casein sensitivity test, milk lactose
  sensitivity test, breathing test (spirometry), attendance Senior
  expert assistant, consultant for children and adolescents, for
  additional guidance and answers to clients' questions, experience of
  more than 20 years in neonatal intensive care units, cooperation
  with children and burns in Prophets hospital Ibn Sina and experience
  of 10 years of work in Shohdai Yafet Hospital, Abad, Instagram page
  of dr.behrouzmeghdadi, personal website www.drbehrouzmeghdadi.com,
  please click to make an appointment for a child's leg scan and
  orthopedic visit.
`;
  isExpanded: boolean = false;

  toggleText() {
    this.isExpanded = !this.isExpanded;
  }

  comment() {}

  getConsultation() {
    this.dialog.open(DilogDotorAppointmentComponent);
  }

  takeTurn(){
    
  }
}
