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
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    phone: ['', Validators.required],
    specialization: ['', Validators.required],
    licenseNumber: ['', Validators.required],
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
    let formValue;
    if (this.selectedRole === 'patient') {
      formValue = this.patientForm.value;
    } else if (this.selectedRole === 'doctor') {
      formValue = this.doctorForm.value;
    } else if (this.selectedRole === 'clinic') {
      const cliniForm = this.clinicForm.value;
      const payload = {
        ...cliniForm,
        role: this.selectedRole,
      };
      if (cliniForm) {
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
          error: res => {
            this.toastrService.error('Registration failed. Please try again.');
          },
          complete: () => {
            console.log('complete');
          },
        });
      }
    }
    console.log('Submitted:', { role: this.selectedRole, data: formValue });
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
