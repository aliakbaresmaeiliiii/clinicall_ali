import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import AOS from 'aos'; 

@Component({
  selector: 'app-service-section',

  templateUrl: './service-section.component.html',
  styleUrl: './service-section.component.scss',
  changeDetection:ChangeDetectionStrategy.OnPush

})
export class ServiceSectionComponent implements OnInit{


  ngOnInit() {
    AOS.init({disable: 'mobile'});
    AOS.refresh();
  }
}
