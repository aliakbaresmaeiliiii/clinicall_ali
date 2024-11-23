import { HttpEventType } from '@angular/common/http';
import {
  Component,
  inject,
  NgZone
} from '@angular/core';
import {
  NgxImageCompressService
} from 'ngx-image-compress';
import { Observable } from 'rxjs';
import { ShareService } from '../../services/share.service';

@Component({
    selector: 'app-img-uploader',
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
