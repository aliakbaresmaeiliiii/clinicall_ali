import { Component, inject, OnInit } from '@angular/core';
import {
  Validators
} from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { BaseComponent } from '../../../../shared/components/base/base.component';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-forgot-password',
  standalone: false,
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.scss',
})
export class ForgotPasswordComponent extends BaseComponent implements OnInit {
  matcher = new ErrorStateMatcher();
  servce = inject(UserService);

  form = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
  });

  ngOnInit(): void {}

  resetPassword() {
    this.servce.forgetPassword(this.form.value.email).subscribe(res => {});
  }

  get email() {
    return this.form.get('email');
  }
}
