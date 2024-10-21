import { Component, inject, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { BaseComponent } from '../../../../shared/components/base/base.component';
import { SettingsService } from '../../services/settings.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrl: './change-password.component.scss',
})
export class ChangePasswordComponent extends BaseComponent implements OnInit {
  service = inject(SettingsService);
  email: string = '';

  form = this.fb.group({
    oldPassword: ['', [Validators.required, Validators.minLength(8)]],
    newPassword: ['', [Validators.required, Validators.minLength(8)]],
    confirmPassword: ['', [Validators.required, Validators.minLength(8)]],
  });
  matcher = new ErrorStateMatcher();

  ngOnInit(): void {
    const getUserData = localStorage.getItem('userData');
    if (getUserData) {
      this.email = JSON.parse(getUserData).email;
    }
  }

  onSubmit() {
    const payload = {
      oldPassword: this.oldPassword?.value,
      newPassword: this.newPassword?.value,
      confirmPassword: this.confirmPassword?.value,
      email: this.email,
    };
    this.service.changeUserPasswrod(payload).subscribe({
      next: result => {
        if (result) {
          this.toastrService.success('Password changed successfully');
          this.form.reset();
        }
      },
      error: err => {
        this.toastrService.error('Faild to change passwsord');
      },
    });

  }

  // getFormControl
  get oldPassword() {
    return this.form.get('oldPassword');
  }
  get newPassword() {
    return this.form.get('newPassword');
  }
  get confirmPassword() {
    return this.form.get('confirmPassword');
  }
}
