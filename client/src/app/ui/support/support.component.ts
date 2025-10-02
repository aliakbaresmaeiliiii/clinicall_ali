import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-support',
  templateUrl: './support.component.html',
  styleUrls: ['./support.component.scss'],
  standalone: false,
})
export class SupportComponent {
  supportType: string = '';

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.supportType = params['type'] || '';
    });
  }

  // Support data
  supportItems = {
    'patient-portal': {
      title: 'Patient Portal',
      description: 'Access your medical records, schedule appointments, and communicate with your healthcare team',
      icon: '💻',
      features: [
        'View medical records and test results',
        'Schedule and manage appointments',
        'Secure messaging with healthcare providers',
        'Request prescription refills',
        'Pay bills online'
      ],
      actions: [
        { label: 'Login to Portal', link: '/auth/login', type: 'primary' },
        { label: 'Register for Portal', link: '/auth/register', type: 'secondary' }
      ]
    },
    'insurance-information': {
      title: 'Insurance Information',
      description: 'Information about accepted insurance plans and billing procedures',
      icon: '🏥',
      features: [
        'Accepted insurance providers',
        'Insurance verification process',
        'Co-payment and deductible information',
        'Out-of-network coverage details',
        'Financial assistance programs'
      ],
      actions: [
        { label: 'Verify Insurance', link: '/contact-us', type: 'primary' },
        { label: 'View Accepted Plans', link: '/insurance-plans', type: 'secondary' }
      ]
    },
    'billing-payments': {
      title: 'Billing & Payments',
      description: 'Understand your medical bills and convenient payment options',
      icon: '💰',
      features: [
        'Online bill payment portal',
        'Payment plan options',
        'Insurance claim assistance',
        'Medical billing inquiries',
        'Financial counseling services'
      ],
      actions: [
        { label: 'Pay Bill Online', link: '/billing/pay', type: 'primary' },
        { label: 'Billing FAQ', link: '/support/faq', type: 'secondary' }
      ]
    },
    'medical-records': {
      title: 'Medical Records',
      description: 'Access and manage your personal health information securely',
      icon: '📋',
      features: [
        'Request medical records',
        'Release information to other providers',
        'View lab results and reports',
        'Download health summaries',
        'Update personal information'
      ],
      actions: [
        { label: 'Request Records', link: '/records/request', type: 'primary' },
        { label: 'Access Portal', link: '/auth/login', type: 'secondary' }
      ]
    },
    'faq': {
      title: 'Frequently Asked Questions',
      description: 'Answers to common questions about our services and procedures',
      icon: '❓',
      features: [
        'Appointment scheduling questions',
        'Insurance and billing inquiries',
        'Medical procedure information',
        'Prescription and medication questions',
        'Emergency care guidelines'
      ],
      actions: [
        { label: 'Contact Support', link: '/contact-us', type: 'primary' },
        { label: 'Browse All FAQs', link: '/support/faq', type: 'secondary' }
      ]
    }
  };

  get currentSupport() {
    return this.supportItems[this.supportType as keyof typeof this.supportItems] || null;
  }

  get allSupportItems() {
    return Object.entries(this.supportItems).map(([key, item]) => ({
      key,
      ...item
    }));
  }
}
