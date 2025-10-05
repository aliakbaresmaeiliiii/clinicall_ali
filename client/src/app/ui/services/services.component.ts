import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.scss'],
  standalone: false,
})
export class ServicesComponent {
  serviceType: string = '';

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    // this.route.params.subscribe(params => {
    //   this.serviceType = params['type'] || '';
    // });
  }

  // Service data
  services = {
    'primary-care': {
      title: 'Primary Care',
      description: 'Comprehensive primary healthcare services for individuals and families',
      icon: '🏥',
      features: [
        'Annual physical examinations',
        'Chronic disease management',
        'Preventive care and screenings',
        'Vaccinations and immunizations',
        'Health education and counseling'
      ],
      doctors: ['Dr. Sarah Johnson', 'Dr. Michael Chen', 'Dr. Emily Rodriguez']
    },
    'specialty-care': {
      title: 'Specialty Care',
      description: 'Advanced specialized medical care from our expert specialists',
      icon: '🎯',
      features: [
        'Cardiology and heart care',
        'Neurology and brain health',
        'Orthopedics and joint care',
        'Gastroenterology',
        'Endocrinology and diabetes care'
      ],
      doctors: ['Dr. Robert Kim', 'Dr. Lisa Wang', 'Dr. James Wilson']
    },
    'emergency-services': {
      title: 'Emergency Services',
      description: '24/7 emergency medical care for urgent health situations',
      icon: '🚑',
      features: [
        '24/7 emergency department',
        'Trauma care specialists',
        'Critical care medicine',
        'Emergency surgery',
        'Pediatric emergency care'
      ],
      doctors: ['Dr. Amanda Lee', 'Dr. David Park', 'Dr. Maria Gonzalez']
    },
    'diagnostic-imaging': {
      title: 'Diagnostic Imaging',
      description: 'State-of-the-art imaging services for accurate diagnosis',
      icon: '📊',
      features: [
        'MRI and CT scanning',
        'X-ray and ultrasound',
        'Mammography services',
        'Nuclear medicine',
        'Interventional radiology'
      ],
      doctors: ['Dr. Thomas Brown', 'Dr. Jennifer White', 'Dr. Kevin Davis']
    },
    'surgical-procedures': {
      title: 'Surgical Procedures',
      description: 'Advanced surgical interventions with minimal recovery time',
      icon: '🔪',
      features: [
        'Minimally invasive surgery',
        'Robotic-assisted procedures',
        'General and specialized surgery',
        'Outpatient surgery center',
        'Post-operative care'
      ],
      doctors: ['Dr. Richard Miller', 'Dr. Susan Taylor', 'Dr. Christopher Lee']
    },
    'preventive-care': {
      title: 'Preventive Care',
      description: 'Proactive healthcare to maintain wellness and prevent illness',
      icon: '🛡️',
      features: [
        'Health risk assessments',
        'Cancer screenings',
        'Lifestyle counseling',
        'Nutritional guidance',
        'Wellness programs'
      ],
      doctors: ['Dr. Patricia Clark', 'Dr. Brian Adams', 'Dr. Nancy Martinez']
    }
  };

  get currentService() {
    return this.services[this.serviceType as keyof typeof this.services] || null;
  }

  get allServices() {
    return Object.entries(this.services).map(([key, service]) => ({
      key,
      ...service
    }));
  }
}
