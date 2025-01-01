import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { Component, inject, output, signal } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { Router } from '@angular/router';

interface MenuItem {
  label: string;
  icon: string; // The SVG content as a string
}
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
  sanitizer = inject(DomSanitizer);

  userMenu: MenuItem[] = [
    {
      label: 'User Information',
      icon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
               <path d="M12 2a7 7 0 1 1 0 14 7 7 0 0 1 0-14zm0 16c-4.97 0-9 4.03-9 9h18c0-4.97-4.03-9-9-9z"/>
             </svg>`,
    },
    {
      label: 'My Appointments',
      icon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
               <path d="M7 2h10v2h5v16H2V4h5V2zm0 4V4H4v16h16V4h-3v2H7zm2 2h6v2H9V8zm0 4h6v2H9v-2z"/>
             </svg>`,
    },
    {
      label: 'My Orders',
      icon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
               <path d="M7 4v2h10V4h5v16H2V4h5zm0 4v2h10V8H7zm0 4v2h6v-2H7z"/>
             </svg>`,
    },
    {
      label: 'Chat Page',
      icon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
               <path d="M20 2H4a2 2 0 0 0-2 2v18l4-4h14a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2zm-3 9h-4v-2h4v2zm-6 0H7v-2h4v2zm6-4h-6V5h6v2z"/>
             </svg>`,
    },
    {
      label: 'Wallet',
      icon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
               <path d="M20 6H4a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2zm-2 10H4V8h14v8zm1-6v2h-6V8h5a1 1 0 0 1 1 1v1z"/>
             </svg>`,
    },
    {
      label: 'My Transactions',
      icon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
               <path d="M12 4a8 8 0 1 1 0 16 8 8 0 0 1 0-16zm1 5h-2v5h5v-2h-3V9z"/>
             </svg>`,
    },
    {
      label: 'My Experiences',
      icon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
               <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77 5.82 21l1.18-6.88-5-4.87 6.91-1.01L12 2z"/>
             </svg>`,
    },
    {
      label: 'My List',
      icon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
               <path d="M3 4h18v2H3V4zm0 5h18v2H3V9zm0 5h18v2H3v-2zm0 5h18v2H3v-2z"/>
             </svg>`,
    },
    {
      label: 'Logout',
      icon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
               <path d="M10 9V5H4v14h6v-4h2v6H2V3h10v6h-2zm10 2h-8v2h8v3l4-4-4-4v3z"/>
             </svg>`,
    },
  ];

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

  loginUser() {
    this.router.navigate(['login']);
  }

  navigateUrl(menuName: string) {
    this.router.navigate(['profile']);
  }
  loginDoctor() {
    this.router.navigate(['doctors/request']);
  }
  ngOnDestroy(): void {
    window.removeEventListener('scroll', this.onWindowScroll.bind(this));
  }
}
