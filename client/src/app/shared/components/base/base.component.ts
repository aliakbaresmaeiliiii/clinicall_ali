import {
  ChangeDetectionStrategy,
  Component,
  inject
} from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { TokenPermission } from '../../../core/auth/models/user';
import { AuthService } from '../../../core/services/auth.service';
import { UserService } from '../../../core/services/user.service';
import { SignalService } from '../../../ui/shared-ui/services/signal.service';

@Component({
  template: '',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false,
})
export abstract class BaseComponent {
  router = inject(Router);
  toastrService = inject(ToastrService);
  fb = inject(FormBuilder);
  dialog = inject(MatDialog);
  authService = inject(AuthService);
  userService = inject(UserService);
  activatedRoute = inject(ActivatedRoute);
  signalService = inject(SignalService);

  roles!: TokenPermission[];
  years = this.getYears();

  constructor() {}

  // ngOnInit(): void {
  //   // this.authService?.permissions.subscribe(data => (this.roles = data));
  // }

  validateAllFormFields(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(field => {
      const control = formGroup.get(field);
      if (control instanceof FormControl) {
        control.markAsTouched({ onlySelf: true });
      }
    });
  }

  onCancel() {
    this.router.navigate(['aliakbar'], { skipLocationChange: true });
  }
  private getYears() {
    const now = new Date().getUTCFullYear();
    return Array(now - (now - 40))
      .fill('')
      .map((_, idx) => now - idx);
  }
}
