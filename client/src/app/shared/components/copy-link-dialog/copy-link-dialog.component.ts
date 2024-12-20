import {
  Component,
  ElementRef,
  inject,
  Inject,
  input,
  output,
  viewChild,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-copy-link-dialog',
  imports: [MatDialogModule, MatButtonModule, MatToolbarModule],
  templateUrl: './copy-link-dialog.component.html',
  styleUrl: './copy-link-dialog.component.scss',
})
export class CopyLinkDialogComponent {
  readonly close = output<void>();
  toast = inject(ToastrService);

  constructor(@Inject(MAT_DIALOG_DATA) public data: { link: string }) {}

  copyLink(input: HTMLInputElement) {
    input.select();
    document.execCommand('copy');
    this.toast.success('Link copied to clipboard!')

    this.close.emit();
  }
}
