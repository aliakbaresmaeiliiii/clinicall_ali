import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  inject,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { delay, of, switchMap } from 'rxjs';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-confirm-email',
  standalone: false,
  templateUrl: './confirm-email.component.html',
  styleUrl: './confirm-email.component.scss',
})
export class ConfirmEmailComponent implements OnInit {
  #userService = inject(UserService);
  #toastrService = inject(ToastrService);
  matcher = new ErrorStateMatcher();
  userData: any;
  form!: FormGroup;
  #router = inject(Router);
  otp!: string;
  showOtpComponent = true;

  config = {
    allowNumbersOnly: false,
    length: 4,
    isPasswordInput: false,
    disableAutoFocus: false,
    inputStyles: {
      width: '50px',
      height: '50px',
    },
  };

  ngOnInit(): void {
    this.form = new FormGroup({
      verify_code: new FormControl('', [
        Validators.required,
        Validators.minLength(4),
      ]),
    });

    const email = localStorage.getItem('emailClinic');
    this.userData = email;
  }
  onOtpChange(otp: any) {
    this.otp = otp;

    if (this.otp.length === this.config.length) {
      this.onSubmit();
    }
  }
  onSubmit() {
    const payload = {
      email: this.userData,
      verify_code: this.otp,
    };

    of(payload)
      .pipe(
        delay(500),
        switchMap(data => this.#userService.confirmEmail(data))
      )
      .subscribe(res => {
        if (res) {
          this.#toastrService.success('Login is successful!');
          this.#router.navigate(['/aliakbar']);
        }
      });
  }

  getOtp() {
    this.#userService.getOTP(this.userData).subscribe(res => {});
  }
  get verify_code() {
    return this.form.get('verify_code');
  }
}
