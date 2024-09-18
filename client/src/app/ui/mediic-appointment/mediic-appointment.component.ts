import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { banWords } from '../../shared/validators/ban-words.validators';
import { debounceTime, switchMap } from 'rxjs';
import { DoctorsService } from '../../modules/doctors/doctors.service';
import AOS from 'aos'; 

@Component({
  selector: 'app-mediic-appointment',
  templateUrl: './mediic-appointment.component.html',
  styleUrl: './mediic-appointment.component.scss',
})
export class MediicAppointmentComponent implements OnInit {
  fb = inject(FormBuilder);
  matcher = new ErrorStateMatcher();
  phoneExists: boolean | null | unknown = null;
  textDirection: 'ltr' | 'rtl' = 'ltr';
  service = inject(DoctorsService);
  
  ngOnInit() {
    AOS.init({disable: 'mobile'});
    AOS.refresh();
  }

  form = this.fb.group({
    name: [
      '',
      [
        Validators.required,
        Validators.minLength(4),
        banWords(['test', 'dummy']),
      ],
    ],
    email: ['', [Validators.required, Validators.email]],
    subject: [''],
    phone: [''],
    message: [''],
  });

  onSubmit() {}
  onAutofill(event: any) {
    console.log('Autofilled:', event.isAutofilled);
    this.phone?.valueChanges
      .pipe(
        debounceTime(300),
        switchMap(value => this.service.checkPhoneNumberExists(value))
      )
      .subscribe(exist => {
        this.phoneExists = exist;
      });
  }
  get name() {
    return this.form.get('name');
  }
  get email() {
    return this.form.get('email');
  }
  get subject() {
    return this.form.get('subject');
  }
  get phone() {
    return this.form.get('phone');
  }
}
