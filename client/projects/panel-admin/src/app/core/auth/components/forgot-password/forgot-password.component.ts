import { Component, inject, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { BaseComponent } from '../../../../shared/components/base/base.component';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { ErrorStateMatcher } from '@angular/material/core';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    MatFormFieldModule,
    RouterLink,
    CommonModule,
    MatIconModule,
  ],
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.scss',
})
export class ForgotPasswordComponent extends BaseComponent implements OnInit {
  matcher = new ErrorStateMatcher();
  servce = inject(UserService);

  form = this.fb.group({
    email: ['', [Validators.required,Validators.email]],
  });

  ngOnInit(): void {}

  resetPassword() {
    this.servce.forgetPassword(this.form.value.email).subscribe(res => {
    });
  }

  get email() {
    return this.form.get('email');
  }
}
