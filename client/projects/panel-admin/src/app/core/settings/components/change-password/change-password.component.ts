import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import {
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { ErrorStateMatcher } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { NgxMatIntlTelInputComponent } from 'ngx-mat-intl-tel-input';
import { BaseComponent } from '../../../../shared/components/base/base.component';

@Component({
  selector: 'app-change-password',
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
    MatSelectModule,
    NgxMatIntlTelInputComponent,
  ],
  templateUrl: './change-password.component.html',
  styleUrl: './change-password.component.scss',
})
export class ChangePasswordComponent extends BaseComponent {
  form = this.fb.group({
    oldPassword: ['', [Validators.required, Validators.minLength(3)]],
    newPassword: ['', [Validators.required, Validators.minLength(3)]],
    confirmPassword: ['', [Validators.required, Validators.minLength(3)]],
  });
  matcher = new ErrorStateMatcher();

  onSubmit() {}

  // getFormControl
  get oldPassword(){
    return this.form.get('oldPassword')
  }
  get newPassword(){
    return this.form.get('newPassword')
  }
  get confirmPassword(){
    return this.form.get('confirmPassword')
  }
}
