import {
  Component,
  inject,
  TemplateRef,
  ViewContainerRef,
  viewChild
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

@Component({
    selector: 'app-cities-support',
    templateUrl: './cities-support.component.html',
    styleUrl: './cities-support.component.scss',
    standalone: false
})
export class CitiesSupportComponent {
  dialog = inject(MatDialog);
  viewContainerRef = inject(ViewContainerRef);
  title: string = '';

  medicalSpecialties = [
    { id: 1, specialty: 'Reconstructive and Urological Surgery' },
    { id: 2, specialty: 'Plastic and Cosmetic Surgery' },
    { id: 3, specialty: 'Neurosurgery' },
    { id: 4, specialty: 'Cardiac Surgery' },
    { id: 5, specialty: 'Orthopedic Surgery' },
    { id: 6, specialty: 'General Surgery' },
    { id: 7, specialty: 'Obstetrics and Gynecology' },
    { id: 8, specialty: 'Pediatric Surgery' },
    { id: 9, specialty: 'ENT Surgery' },
    { id: 10, specialty: 'Oral and Maxillofacial Surgery' },
    { id: 11, specialty: 'Hand Surgery' },
    { id: 12, specialty: 'Thoracic Surgery' },
    { id: 13, specialty: 'Transplant Surgery' },
    { id: 14, specialty: 'Spinal Surgery' },
    { id: 15, specialty: 'Ophthalmic Surgery' },
    { id: 16, specialty: 'Urology' },
    { id: 17, specialty: 'Oncology' },
    { id: 18, specialty: 'Rheumatology' },
    { id: 19, specialty: 'Gastroenterology and Hepatology' },
    { id: 20, specialty: 'Neurology' },
    { id: 21, specialty: 'Nephrology' },
    { id: 22, specialty: 'Endocrinology and Metabolism' },
    { id: 23, specialty: 'Hematology and Oncology' },
    { id: 24, specialty: 'Allergy and Immunology' },
    { id: 25, specialty: 'Geriatrics' },
    { id: 26, specialty: 'Internal Medicine' },
    { id: 27, specialty: 'Emergency Medicine' },
    { id: 28, specialty: 'Traditional and Complementary Medicine' },
    { id: 29, specialty: 'Psychiatry' },
    { id: 30, specialty: 'Psychology' },
    { id: 31, specialty: 'Cardiology' },
    { id: 32, specialty: 'Pathology' },
    { id: 33, specialty: 'Pharmacology' },
    { id: 34, specialty: 'Forensic Medicine' },
    { id: 35, specialty: 'Family Medicine' },
    { id: 36, specialty: 'Social Medicine' },
    { id: 37, specialty: 'Dermatology' },
    { id: 38, specialty: 'Physical Medicine and Rehabilitation' },
    { id: 39, specialty: 'Infectious Diseases' },
    { id: 40, specialty: 'Sports Medicine' },
    { id: 41, specialty: 'Infectious Disease' },
    { id: 42, specialty: 'Radiology' },
    { id: 43, specialty: 'Pediatric Oncology' },
    { id: 44, specialty: 'Sleep Medicine' },
    { id: 45, specialty: 'Pediatrics' },
    { id: 46, specialty: 'Occupational Medicine' },
    { id: 47, specialty: 'Environmental Medicine' },
    { id: 48, specialty: 'Endocrinology' },
    { id: 49, specialty: 'Laparoscopic Surgery' },
    { id: 50, specialty: 'Microsurgery' },
  ];

  readonly clinicTemplate = viewChild.required<TemplateRef<any>>('clinicTemplate');

  citiesInMalaysia = [
    {
      state: 'Johor',
      cities: ['Johor Bahru', 'Batu Pahat', 'Kluang', 'Muar', 'Segamat'],
    },
    {
      state: 'Kedah',
      cities: ['Alor Setar', 'Sungai Petani', 'Kulim', 'Baling', 'Jitra'],
    },
    {
      state: 'Kelantan',
      cities: ['Kota Bharu', 'Pasir Mas', 'Tanah Merah', 'Machang', 'Tumpat'],
    },
    // { state: 'Kuala Lumpur', cities: ['Kuala Lumpur'] },
    // { state: 'Labuan', cities: ['Labuan'] },
    // // {
    //   state: 'Malacca',
    //   cities: ['Malacca City', 'Ayer Keroh', 'Alor Gajah', 'Jasin'],
    // },
    // {
    //   state: 'Negeri Sembilan',
    //   cities: ['Seremban', 'Port Dickson', 'Nilai', 'Bahau', 'Tampin'],
    // },
    // {
    //   state: 'Pahang',
    //   cities: ['Kuantan', 'Bentong', 'Temerloh', 'Raub', 'Jerantut'],
    // },
    // {
    //   state: 'Penang',
    //   cities: ['George Town', 'Butterworth', 'Bayan Lepas', 'Seberang Jaya'],
    // },
    // {
    //   state: 'Perak',
    //   cities: ['Ipoh', 'Taiping', 'Teluk Intan', 'Manjung', 'Sungai Siput'],
    // },
    // { state: 'Perlis', cities: ['Kangar', 'Arau'] },
    // { state: 'Putrajaya', cities: ['Putrajaya'] },
    // {
    //   state: 'Sabah',
    //   cities: ['Kota Kinabalu', 'Sandakan', 'Tawau', 'Lahad Datu', 'Kudat'],
    // },
    // {
    //   state: 'Sarawak',
    //   cities: ['Kuching', 'Miri', 'Sibu', 'Bintulu', 'Sarikei'],
    // },
    // {
    //   state: 'Selangor',
    //   cities: ['Shah Alam', 'Petaling Jaya', 'Subang Jaya', 'Klang', 'Ampang'],
    // },
    // {
    //   state: 'Terengganu',
    //   cities: ['Kuala Terengganu', 'Dungun', 'Kemaman', 'Marang', 'Besut'],
    // },
  ];

  openClinicBranch(
    enterAnimationDuration: string,
    exitAnimationDuration: string,
    city: string
  ) {
    this.title = city;
    const dialogRef = this.dialog.open(this.clinicTemplate(), {
      enterAnimationDuration,
      exitAnimationDuration,
      width: '500px',
    });
    dialogRef.afterClosed().subscribe(result => {});
  }
}
