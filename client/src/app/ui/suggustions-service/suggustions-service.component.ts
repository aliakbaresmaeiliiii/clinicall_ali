import { Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-suggustions-service',
  templateUrl: './suggustions-service.component.html',
  // styleUrl: './suggustions-service.component.scss',
  styleUrls: [
    "../../../../node_modules/keen-slider/keen-slider.min.css",
    "./suggustions-service.component.scss",
  ],
  standalone: false,
})
export class SuggustionsServiceComponent  {
  swiperData = [
    {
      src: '../../../assets/images/ui/speciality/women.png',
      key: 1,
      specialty: 'Gynecologist & Obstetrician',
      count: 3000,
    },
    {
      src: '../../../assets/images/ui/speciality/women.png',
      key: 1,
      specialty: 'Gynecologist & Obstetrician',
      count: 3000,
    },
    {
      src: '../../../assets/images/ui/speciality/women.png',
      key: 1,
      specialty: 'Gynecologist & Obstetrician',
      count: 3000,
    },
    {
      src: '../../../assets/images/ui/speciality/skin.png',
      key: 2,
      specialty: 'Dermatologist & Aesthetic Specialist',
      count: 5000,
    },
    {
      src: '../../../assets/images/ui/speciality/neurologist.png',

      key: 3,
      specialty: 'Neurologist',
      count: 5000,
    },
    {
      src: '../../../assets/images/ui/speciality/psychology.png',
      key: 4,
      specialty: 'Psychologist',
      count: 5000,
    },

    {
      src: '../../../assets/images/ui/speciality/endocrinologist.png',
      key: 6,
      specialty: 'Urologist',
      count: 5000,
    },
    {
      src: '../../../assets/images/ui/speciality/kids.png',
      key: 7,
      specialty: 'Endocrinologist',
      count: 5000,
    },
    {
      src: '../../../assets/images/ui/speciality/general.png',
      key: 8,
      specialty: 'Pediatrician',
      count: 5000,
    },
    {
      src: '../../../assets/images/ui/speciality/orthopedist.png',
      key: 9,
      specialty: 'Internist',
      count: 5000,
    },
    {
      src: '../../../assets/images/ui/speciality/neurosurgeon.png',
      key: 10,
      specialty: 'Orthopedic Surgeon',
      count: 5000,
    },
    {
      src: '../../../assets/images/ui/speciality/cardiologist.png',
      key: 11,
      specialty: 'Cardiologist',
      count: 5000,
    },
    {
      src: '../../../assets/images/ui/speciality/dentist.png',
      key: 12,
      specialty: 'Dentist',
      count: 5000,
    },
    {
      src: '../../../assets/images/ui/speciality/ent.png',
      key: 13,
      specialty: 'ENT Specialist',
      count: 5000,
    },
    {
      src: '../../../assets/images/ui/speciality/eye.png',
      key: 14,
      specialty: 'Ophthalmologist',
      count: 5000,
    },
  ];


}
