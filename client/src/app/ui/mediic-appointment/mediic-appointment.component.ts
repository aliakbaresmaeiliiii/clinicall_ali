import {
  Component,
  inject,
  OnInit
} from '@angular/core';
import { AngularFireFunctions } from '@angular/fire/compat/functions';
import { FormBuilder, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import AOS from 'aos';
import { ToastrService } from 'ngx-toastr';
import { debounceTime, switchMap } from 'rxjs';
import { DoctorsService } from '../../modules/doctors/services/doctors.service';
import { banWords } from '../../shared/validators/ban-words.validators';


@Component({
    selector: 'app-mediic-appointment',
    templateUrl: './mediic-appointment.component.html',
    styleUrl: './mediic-appointment.component.scss',
    standalone: false
})
export class MediicAppointmentComponent implements OnInit {
  fb = inject(FormBuilder);
  fn = inject(AngularFireFunctions);
  toast = inject(ToastrService);
  matcher = new ErrorStateMatcher();



  phoneExists: boolean | null | unknown = null;
  textDirection: 'ltr' | 'rtl' = 'ltr';
  service = inject(DoctorsService);

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

  });

  ngOnInit() {
    AOS.init({
      duration: 1000, // Animation duration in milliseconds
      easing: 'ease-in-out', // Easing type
      once: true // Whether animation should happen only once
    });
    AOS.refresh();
    AOS.refresh();
  }



  onSubmit() {
    if (this.form.value) {
      const bookingData = this.form.value;
      this.fn
        .httpsCallable('sendEmail')(bookingData)
        .subscribe({
          next: (result) => {
            this.toast.success(`Email sent successfully,${result}`,);
          },
          error:(errro)=>{
            this.toast.error(`Error sending email,${errro}`,);

          }
        });
    }
  }
  onAutofill(event: any) {
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
