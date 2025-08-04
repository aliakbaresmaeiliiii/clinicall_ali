import {
  Component,
  inject,
  Inject,
  output
} from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-copy-link-dialog',
  standalone:false,
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
