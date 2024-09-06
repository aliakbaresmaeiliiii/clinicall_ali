import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  inject,
  input,
  NgZone,
  signal,
  WritableSignal,
} from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatToolbarModule } from '@angular/material/toolbar';
import {
  NgxImageCaptureModule,
  NgxImageCompressService,
} from 'ngx-image-compress';
import { delay, Observable } from 'rxjs';
import { PatientsService } from '../../../modules/patients/services/patients.service';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ShareService } from '../../services/share.service';
import { LoaderComponent } from '../loader/loader.component';
import { HttpEventType } from '@angular/common/http';

@Component({
  selector: 'app-img-uploader',
  standalone: true,
  imports: [
    CommonModule,
    NgxImageCaptureModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatCardModule,
    MatGridListModule,
    MatToolbarModule,
    MatProgressBarModule,
    MatInputModule,
    MatIconModule,
    MatTooltipModule,
    LoaderComponent,
  ],
  templateUrl: './img-uploader.component.html',
  styleUrl: './img-uploader.component.scss',
  providers: [NgxImageCompressService],
})
export class ImgUploaderComponent {
  service = inject(ShareService);
  selectedFiles?: FileList;
  selectedFileNames: string[] = [];
  file: File | null = null;

  progressInfos: any[] = [];
  message: string[] = [];
  previews: string[] = [];
  imageInfos?: Observable<any>;

  constructor(private zone: NgZone) {}

  ngOnInit(): void {
    // this.imageInfos = this.uploadService.getFiles();
  }

  selectFiles(event: any): void {
    this.message = [];
    this.progressInfos = [];
    this.selectedFileNames = [];
    this.selectedFiles = event.target.files;
    const files = event.target.files;

    this.previews = [];
    if (this.selectedFiles && this.selectedFiles[0]) {
      const numberOfFiles = this.selectedFiles.length;
      for (let i = 0; i < numberOfFiles; i++) {
        const reader = new FileReader();

        reader.onload = (e: any) => {
          this.previews.push(e.target.result);
        };
        reader.readAsDataURL(this.selectedFiles[i]);
        this.selectedFileNames.push(this.selectedFiles[i].name);
      }
    }
  }

  upload(idx: number, file: File): void {
    this.progressInfos[idx] = { value: 0, fileName: file };
    if (file) {
      this.service.storeProfileImg.next(file);
      this.service.uploadImg(file).subscribe(
        (event:any)=>{
          if(event.type === HttpEventType.UploadProgress){
          }
        }
      )


      // this.uploadService.upload(file).subscribe(
      //   (event: any) => {
      //     if (event.type === HttpEventType.UploadProgress) {
      //       this.progressInfos[idx].value = Math.round(
      //         (100 * event.loaded) / event.total
      //       );
      //     } else if (event instanceof HttpResponse) {
      //       const msg = file.name + ': Successful!';
      //       this.message.push(msg);
      //       this.imageInfos = this.uploadService.getFiles();
      //     }
      //   },
      //   (err: any) => {
      //     this.progressInfos[idx].value = 0;
      //     let msg = file.name + ': Failed!';
      //     if (err.error && err.error.message) {
      //       msg += ' ' + err.error.message;
      //     }
      //     this.message.push(msg);
      //   }
      // );
    }
  }

  isLoading() {
    return this.service.isLoading();
  }

  uploadFiles(): void {
    this.service.setLoading(true);
    this.message = [];
    if (this.selectedFiles) {
      for (let i = 0; i < this.selectedFiles.length; i++) {
        this.upload(i, this.selectedFiles[i]);
      }
    }
  }
}
