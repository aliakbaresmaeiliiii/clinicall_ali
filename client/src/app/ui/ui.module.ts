import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { RouterModule, RouterOutlet, Routes } from '@angular/router';
import { NgxMatIntlTelInputComponent } from 'ngx-mat-intl-tel-input';
import { ButtonComponent } from '../shared/components/button/button.component';
import { CustomCardComponent } from '../shared/components/custom-card/custom-card.component';
import { GoogleMapComponent } from '../shared/components/google-map/google-map.component';
import { SocialMediaIconComponent } from '../shared/components/social-media-icon/social-media-icon.component';
import { ScrollAnimationDirective } from '../shared/directives/scroll-animation/scoll-animation.directive';
import { AboutUsComponent } from './about-us/about-us.component';
import { BestDoctorsComponent } from './best-doctors/best-doctors.component';
import { BlogComponent } from './blog/blog.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { DoctorsComponent } from './doctors/doctors.component';
import { FeatureSectionComponent } from './feature-section/feature-section.component';
import { FooterComponent } from './footer/footer.component';
import { AppScrollProgressBarComponent } from './header/app-scroll-progress-bar/app-scroll-progress-bar.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { MediicAppointmentComponent } from './mediic-appointment/mediic-appointment.component';
import { ServiceSectionComponent } from './service-section/service-section.component';
import { ServicesDoctorComponent } from './services-doctor/services-doctor.component';
import { SliderComponent } from './slider/slider.component';
import { DrProjectsComponent } from './dr-projects/dr-projects.component';
import { DetailDrProjectComponent } from './detail-dr-project/detail-dr-project.component';
import { CounterDirective } from '../shared/directives/counter-number/counter.directive';
import { PlaceholderComponent } from './shared-ui/components/placeholder/placeholder.component';
const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      {
        path: '',
        component: FeatureSectionComponent,
      },
      { path: 'doctors', component: DoctorsComponent },
      { path: 'services', component: ServicesDoctorComponent },
      { path: 'contact-us', component: ContactUsComponent },
      { path: 'about-us', component: AboutUsComponent },
      { path: 'dr-projects', component: DrProjectsComponent },
      { path: 'detail-dr-project', component: DetailDrProjectComponent },
    ],
  },
];

@NgModule({
  declarations: [
    HomeComponent,
    HeaderComponent,
    SliderComponent,
    FeatureSectionComponent,
    ServiceSectionComponent,
    BestDoctorsComponent,
    BlogComponent,
    FooterComponent,
    DoctorsComponent,
    ServicesDoctorComponent,
    MediicAppointmentComponent,
    ContactUsComponent,
    DrProjectsComponent,
    DetailDrProjectComponent,
    PlaceholderComponent
  ],
  imports: [
    CommonModule,
    RouterOutlet,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,
    MatMenuModule,
    ButtonComponent,
    ScrollAnimationDirective,
    SocialMediaIconComponent,
    CustomCardComponent,
    MatListModule,
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule,
    MatButtonModule,
    MatCardModule, 
    NgxMatIntlTelInputComponent,
    GoogleMapComponent,
    AppScrollProgressBarComponent,
    CounterDirective,


  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class UiModule {}
