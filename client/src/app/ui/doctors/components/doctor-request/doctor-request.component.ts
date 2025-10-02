import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { BaseComponent } from '../../../../shared/components/base/base.component';
import { banWords } from '../../../../shared/validators/ban-words.validators';
import { ErrorStateMatcher } from '@angular/material/core';

@Component({
  selector: 'app-doctor-request',
  standalone: false,
  templateUrl: './doctor-request.component.html',
  styleUrl: './doctor-request.component.scss',
})
export class DoctorRequestComponent extends BaseComponent implements OnInit {
  matcher = new ErrorStateMatcher();
  isSubmitting = false;
  showSuccessMessage = false;

  // Expertise options for dropdown
  expertiseOptions = [
    'Cardiology',
    'Dermatology',
    'Neurology',
    'Pediatrics',
    'Orthopedics',
    'Psychiatry',
    'General Practice',
    'Surgery',
    'Internal Medicine',
    'Other'
  ];

  genderOptions = [
    'Male',
    'Female',
    'Other',
    'Prefer not to say'
  ];

  form = this.fb.group({
    medicalCode: ['', [Validators.required, Validators.pattern(/^[A-Za-z0-9]{6,12}$/)]],
    firstName: ['', [Validators.required, Validators.minLength(2), banWords(['test', 'dummy'])]],
    lastName: ['', [Validators.required, Validators.minLength(2)]],
    nationalCode: ['', [Validators.required, Validators.pattern(/^[0-9]{10}$/)]],
    email: ['', [Validators.required, Validators.email]],
    phone: ['', [Validators.required, Validators.pattern(/^[0-9]{10,15}$/)]],
    gender: ['', [Validators.required]],
    expertise: ['', [Validators.required]],
    yearsOfExperience: ['', [Validators.required, Validators.min(1), Validators.max(50)]],
    additionalInfo: ['']
  });

  ngOnInit(): void {}

  sendRequest() {
    if (this.form.valid && !this.isSubmitting) {
      this.isSubmitting = true;
      
      // Simulate API call
      setTimeout(() => {
        this.isSubmitting = false;
        this.showSuccessMessage = true;
        this.form.reset();
        
        // Hide success message after 5 seconds
        setTimeout(() => {
          this.showSuccessMessage = false;
        }, 5000);
      }, 2000);
    }
  }

  getFieldError(fieldName: string): string {
    const field = this.form.get(fieldName);
    if (field?.errors && field.touched) {
      if (field.errors['required']) {
        return 'This field is required';
      }
      if (field.errors['email']) {
        return 'Please enter a valid email address';
      }
      if (field.errors['pattern']) {
        if (fieldName === 'medicalCode') return 'Medical code must be 6-12 alphanumeric characters';
        if (fieldName === 'nationalCode') return 'National code must be 10 digits';
        if (fieldName === 'phone') return 'Phone number must be 10-15 digits';
      }
      if (field.errors['minlength']) {
        return `Minimum ${field.errors['minlength'].requiredLength} characters required`;
      }
      if (field.errors['min']) {
        return `Minimum ${field.errors['min'].min} years required`;
      }
      if (field.errors['max']) {
        return `Maximum ${field.errors['max'].max} years allowed`;
      }
    }
    return '';
  }
}
