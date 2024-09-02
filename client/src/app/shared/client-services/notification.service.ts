import { Injectable, inject } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  #toastrService = inject(ToastrService);

  matDialog = inject(MatSnackBar);

  showSuccess(message: string) {
    return this.#toastrService.success(message);
  }
  showError(message: string) {
    return this.#toastrService.error(message);
  }
  showWarning(message: string) {
    return this.#toastrService.warning(message);
  }

  showInfo(message: string) {
    return this.#toastrService.info(message);
  }
}
