import { Component, inject, signal } from '@angular/core';
import { Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { BaseComponent } from '../../../../shared/components/base/base.component';
import { passswordShouldMatch } from '../../../../shared/validators/password-should-math.validator';
import { UniqueNicknameValidator } from '../../../../shared/validators/unique-nickname.validators';
import { ClinicService } from '../../../services/clinic.service';

@Component({
  selector: 'app-register',
  standalone: false,
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent extends BaseComponent {
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
  matcher = new ErrorStateMatcher();
  selectedRole: string = 'patient';

  patientForm = this.fb.group({
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    phone: ['', Validators.required],
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
      const payload = { ...formData, role: this.selectedRole };
      this.signUpUser(payload);
    }

    console.log('Submitted:', { role: this.selectedRole, data: formData });
  }

  signUpUser(payload: any) {
    this.authService.signUp(payload).subscribe({
      next: (res: any) => {
        if (res.code === 200) {
          this.toastrService.success(
            `${res.newUser.email} registered successfully`
          );
          localStorage.setItem('emailClinic', res.newUser.email);
          this.router.navigate(['auth/confirm-email']);
        }
      },
      error: () => {
        this.toastrService.error('Registration failed. Please try again.');
      },
      complete: () => console.log('complete'),
    });
  }
  trackByFn() {}

  get clinicConfirmPassword() {
    return this.clinicForm.get('confirmPassword');
  }
  get clininPassword() {
    return this.clinicForm.get('password');
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
