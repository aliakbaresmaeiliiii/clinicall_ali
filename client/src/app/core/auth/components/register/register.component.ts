import { Component, inject, OnInit, signal } from '@angular/core';
import { Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { BaseComponent } from '../../../../shared/components/base/base.component';
import { passswordShouldMatch } from '../../../../shared/validators/password-should-math.validator';
import { UniqueNicknameValidator } from '../../../../shared/validators/unique-nickname.validators';
import { ClinicService } from '../../../services/clinic.service';
import { ShareAuthService } from '../../../services/share.service';

@Component({
  selector: 'app-register',
  standalone: false,
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent extends BaseComponent implements OnInit {
  items = [
    {
      top: '10%',
      left: '20%',
      image: '../../../../../assets/images/ali.jpg',
      alt: 'Floating Item 1',
    },
    {
      top: '30%',
      left: '50%',
      image: '../../../../../assets/images/ali.jpg',
      alt: 'Floating Item 2',
    },
    {
      top: '70%',
      left: '10%',
      image: '../../../../../assets/images/ali.jpg',
      alt: 'Floating Item 3',
    },
  ];

  rainDrops = Array.from({ length: 100 }, () => ({
    x: Math.random() * 100 + '%',
    y: Math.random() * -100 + '%',
  }));

  title = signal<string>('');
  uniqueNickname = inject(UniqueNicknameValidator);
  clinicService = inject(ClinicService);
  shareSerivce = inject(ShareAuthService);
  matcher = new ErrorStateMatcher();
  selectedRole: string = 'patient';

  patientForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
  });

  doctorForm = this.fb.group({
    first_name: ['', Validators.required],
    last_name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    phone: ['', Validators.required],
    specialization: ['', Validators.required],
    licenseNumber: ['', Validators.required],
    password: this.fb.group(
      {
        password: ['', [Validators.required, Validators.minLength(8)]],
        confirmPassword: '',
      },
      {
        validators: passswordShouldMatch,
      }
    ),
  });

  clinicForm = this.fb.group({
    name: ['', Validators.required],
    owner_name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    password: this.fb.group(
      {
        password: ['', [Validators.required, Validators.minLength(3)]],
        confirmPassword: '',
      },
      {
        validators: passswordShouldMatch,
      }
    ),
    phone: ['', Validators.required],
    address: ['', Validators.required],
    city: ['', Validators.required],
    state: ['', Validators.required],
    zip_code: ['', Validators.required],
    country: ['', Validators.required],
  });

  setRole(role: string) {
    this.selectedRole = role;
    this.title.set(role);
  }

  ngOnInit(): void {
    this.setRole('clinic');
  }

  onSubmit() {
    let formData: any;

    switch (this.selectedRole) {
      case 'patient':
        formData = this.patientForm.value;
        break;
      case 'doctor':
        formData = this.doctorForm.value;
        break;
      case 'clinic':
        formData = this.clinicForm.value;
        break;
      default:
        this.toastrService.error('Invalid role selected.');
        return;
    }

    if (formData) {
      // Store role locally, don't send to database
      const payload = { ...formData };
      this.signUpUser(payload);
    }
  }

  signUpUser(payload: any) {
    this.handleRoleBasedRegistration(payload);
  }

  private handleRoleBasedRegistration(payload: any): void {
    switch (this.selectedRole) {
      case 'patient':
        this.handlePatientRegistration(payload);
        break;
      case 'clinic':
        this.handleClinicRegistration(payload);
        break;
      case 'doctor':
        this.handleDoctorRegistration(payload);
        break;
      default:
        this.toastrService.error('Invalid role selected.');
        break;
    }
  }

  private handlePatientRegistration(payload: any): void {
    this.authService.patientRegister(payload).subscribe({
      next: (res: any) => {
        if (res.statusCode === 201 || res.code === 201) {
          this.handleRegistrationSuccess(payload.email, this.selectedRole, res);
        }
      },
      error: error => {
        this.handleRegistrationError(error, 'Patient registration failed');
      },
      complete: () => console.log('complete'),
    });
  }

  private handleClinicRegistration(payload: any): void {
    const { confirmPassword, password } = payload.password;
    const finalPayload = {
      ...payload,
      password,
      confirmPassword,
    };

    this.authService.clinicRegister(finalPayload).subscribe({
      next: (res: any) => {
        if (res.code === 201) {
          this.handleRegistrationSuccess(
            res.data.email,
            this.selectedRole,
            res
          );
        }
      },
      error: error => {
        this.handleRegistrationError(error, 'Clinic registration failed');
      },
      complete: () => {
        this.router.navigate(['auth/confirm-email']);
      },
    });
  }

  private handleDoctorRegistration(payload: any): void {
    this.authService.doctorRegister(payload).subscribe({
      next: (res: any) => {
        if (res.code === 200) {
          this.handleRegistrationSuccess(
            res.newUser.email,
            this.selectedRole,
            res
          );
        }
      },
      error: error => {
        this.handleRegistrationError(error, 'Doctor registration failed');
      },
      complete: () => console.log('complete'),
    });
  }

  private handleRegistrationSuccess(
    email: string,
    role: string,
    response: any
  ): void {
    this.toastrService.success(
      `Please check your email box to confirm ${email}`
    );

    if (role === 'patient') {
      localStorage.setItem('patientInfo', JSON.stringify(response));
    }
    this.shareSerivce.setEmail(email);
    this.shareSerivce.setSelectedRole(role);
    localStorage.setItem('userInfo', JSON.stringify(email));

    this.router.navigate(['auth/confirm-email']);
  }

  private handleRegistrationError(error: any, context: string): void {
    console.error(`${context}:`, error);
    this.toastrService.error('Registration failed. Please try again.');
  }
  trackByFn() {}

  get clinicConfirmPassword() {
    return this.clinicForm?.get('confirmPassword');
  }
  get clininPassword() {
    return this.clinicForm?.get('password');
  }
}

// form = this.fb.group({
//   firstName: ['', [Validators.required]],
//   lastName: ['', [Validators.required]],

//   userName: [
//     'Aliakbar',
//     [Validators.required, Validators.minLength(2), banWords(['test'])],
//   ],
//   email: ['a@gmail.com', [Validators.required, Validators.email]],
//   password: this.fb.group(
//     {
//       password: ['', [Validators.required, Validators.minLength(3)]],
//       confirmPassword: '',
//     },
//     {
//       validators: passswordShouldMatch,
//     }
//   ),
// });
