import { inject, Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

@Injectable({
  providedIn: 'root',
})
export class DialogService {
  dialog = inject(MatDialog);

  openDialog(component: any, data?: any, panelClass = 'custom-dialog') {
    const dialogRef = this.dialog.open(component, {
      data,
      width: this.getDialogWidth(),
      height: this.getDialogHeight(),
      maxWidth: '90vw',
      maxHeight: '90vh',
      panelClass,
    });

    return dialogRef.afterClosed(); 
  }

  private getDialogWidth(): string {
    return window.innerWidth > 800 ? '40vw' : '90vw';
  }

  private getDialogHeight(): string {
    return window.innerHeight > 600 ? '60vh' : '90vh';
  }
}
