import {
  Component,
  ElementRef,
  inject,
  Renderer2,
  ViewChild,
} from '@angular/core';

@Component({
  selector: 'app-doctors',
  templateUrl: './doctors.component.html',
  styleUrl: './doctors.component.scss',
})
export class DoctorsComponent {
  renderer = inject(Renderer2);
  @ViewChild('socialIcon') socialIcon!: ElementRef;

  images = [
    { src: '../../../assets/images/ui/doctors/1.jpg' },
    { src: '../../../assets/images/ui/doctors/2.jpg' },
    { src: '../../../assets/images/ui/doctors/3.jpg' },
    { src: '../../../assets/images/ui/doctors/4.jpg' },
    { src: '../../../assets/images/ui/doctors/5.jpg' },
    { src: '../../../assets/images/ui/doctors/7.jpg' },
    { src: '../../../assets/images/ui/doctors/8.jpg' },
    { src: '../../../assets/images/ui/doctors/9.jpg' },
  ];

  shoIcon() {
    this.renderer.setStyle(this.socialIcon.nativeElement, 'opacity', '1');
  }

  hideIcon() {
    if (this.socialIcon) {
      this.renderer.setStyle(this.socialIcon.nativeElement, 'opacity', '0');
    }
  }
}
