import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { Component, inject, output, signal } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  animations: [
    trigger('openClose', [
      state(
        'open',
        style({
          opacity: 1,
          transform: 'translateY(0)',
          transition: '500ms',
        })
      ),
      state(
        'closed',
        style({
          opacity: 0,
          transform: 'translateY(-100%)',
          transition: '500ms',
        })
      ),
      transition('open => closed', [animate('1s ease-in-out')]),
      transition('closed => open', [animate('1s ease-in-out')]),
    ]),
    trigger('bgColorChange', [
      state(
        'default',
        style({
          backgroundColor: '#fff',
        })
      ),
      state(
        'scrolled',
        style({
          backgroundColor: '#002570',
        })
      ),
      transition('default => scrolled', [animate('1s ease')]),
      transition('scrolled => default', [animate('1s ease')]),
    ]),
  ],
  standalone: false,
})
export class HeaderComponent {
  navbarVisible = signal(true);
  dialog = inject(MatDialog);
  router = inject(Router);
  userData: string = '';

  private lastScrollPosition = 0;
  bgColor: string = 'default';
  drawer = output<boolean>();
  selectedCategoryIndex: number | null = null;

  progressValue = output<number | string>();
  progressValue$: any;

  dentistryCategories = [
    {
      title: 'General Dentistry',
      description:
        'Focuses on maintaining oral hygiene and treating basic dental problems.',
      treatments: [
        'Regular checkups and cleanings',
        'Dental fillings',
        'Simple tooth extractions',
        'Treating tooth decay',
      ],
    },
    {
      title: 'Restorative Dentistry',
      description:
        'Restores the function and appearance of damaged or missing teeth.',
      treatments: [
        'Composite or amalgam fillings',
        'Dental crowns',
        'Bridges',
        'Dental implants',
        'Dentures',
      ],
    },
    {
      title: 'Orthodontics',
      description:
        'Corrects misaligned teeth and jaws to improve oral function and aesthetics.',
      treatments: [
        'Metal braces',
        'Invisalign',
        'Retainers',
        'Palatal expanders',
      ],
    },
    {
      title: 'Cosmetic Dentistry',
      description: 'Enhances the appearance of teeth and smile aesthetics.',
      treatments: [
        'Teeth whitening',
        'Dental veneers',
        'Dental bonding',
        'Smile design',
        'Gingival contouring',
      ],
    },
    {
      title: 'Endodontics',
      description:
        'Specializes in treating the inner part of the tooth, including the pulp and root canals.',
      treatments: [
        'Root canal therapy',
        'Pulp capping',
        'Apicoectomy',
        'Internal bleaching',
      ],
    },
    {
      title: 'Periodontics',
      description:
        'Focuses on the prevention, diagnosis, and treatment of gum disease.',
      treatments: [
        'Scaling and root planing',
        'Gum surgery',
        'Gum grafting',
        'Laser gum treatment',
      ],
    },
    {
      title: 'Oral and Maxillofacial Surgery',
      description:
        'Involves surgical procedures on the teeth, jaws, and facial bones.',
      treatments: [
        'Wisdom teeth removal',
        'Orthognathic surgery',
        'Cyst and tumor removal',
        'Facial trauma repair',
      ],
    },
    {
      title: 'Pediatric Dentistry',
      description:
        'Specialized care for children’s dental health, including preventive and restorative treatments.',
      treatments: [
        'Fluoride application',
        'Dental sealants',
        'Space maintainers',
        'Pulpotomy',
      ],
    },
    {
      title: 'Prosthodontics',
      description: 'Focuses on designing and fitting dental prosthetics.',
      treatments: [
        'Full and partial dentures',
        'Dental bridges',
        'Implant-supported prosthetics',
        'Dental crowns',
      ],
    },
    {
      title: 'Oral Pathology',
      description:
        'Diagnoses and treats diseases of the oral cavity and surrounding tissues.',
      conditions: [
        'Oral cancer',
        'Cysts and tumors',
        'Leukoplakia',
        'Lichen planus',
      ],
    },
    {
      title: 'Dental Radiology',
      description:
        'Uses imaging techniques to diagnose dental and oral conditions.',
      tools: ['X-rays', 'CT scans', 'Cone beam CT', 'MRI'],
    },
    {
      title: 'Sleep Dentistry',
      description:
        'Addresses issues related to sleep disorders and their impact on oral health.',
      treatments: [
        'Sleep apnea appliances',
        'Nightguards',
        'Snoring treatments',
        'Orthognathic surgery',
      ],
    },
    {
      title: 'Preventive Dentistry',
      description: 'Aims to prevent dental problems through proactive care.',
      treatments: [
        'Dental cleanings',
        'Fluoride treatments',
        'Sealants',
        'Oral hygiene education',
      ],
    },
    {
      title: 'Geriatric Dentistry',
      description:
        'Provides dental care for elderly patients with age-related conditions.',
      treatments: [
        'Treating dry mouth',
        'Managing gum recession',
        'Custom dentures',
        'Implant-supported bridges',
      ],
    },
    {
      title: 'Holistic Dentistry',
      description:
        'Emphasizes the use of non-toxic materials and integrates oral health with overall well-being.',
      treatments: [
        'Mercury-free fillings',
        'Biocompatible dental implants',
        'Ozone therapy',
        'Nutritional counseling',
      ],
    },
  ];

  ngOnInit(): void {
    window.addEventListener('scroll', this.onWindowScroll.bind(this));
    if (typeof localStorage !== 'undefined') {
      const getStoreItem = localStorage.getItem('userData');
      if (getStoreItem) {
        const getItem = JSON.parse(getStoreItem);
        this.userData = getItem.userName;
      }
    }
  }

  onWindowScroll(): void {
    const currentScrollPosition = window.scrollY;
    if (currentScrollPosition > this.lastScrollPosition) {
      this.bgColor = 'scrolled';
      this.navbarVisible.set(false);
    } else if (currentScrollPosition === 0) {
      this.bgColor = 'default';
      this.navbarVisible.set(true);
    }
    this.lastScrollPosition = currentScrollPosition;
  }

  hoveredCategoryIndex: number | null = null;

  toggleCategory(index: number | null): void {
    console.log(index);

    this.hoveredCategoryIndex = index;
  }

  setAppointment() {
    debugger;
    this.router.navigate(['/doctors']);
  }

  loginUser() {
    this.router.navigate(['login']);
  }
  
  loginDoctor(){
    this.router.navigate(['doctors/request']);
  }
  ngOnDestroy(): void {
    window.removeEventListener('scroll', this.onWindowScroll.bind(this));
  }
}
