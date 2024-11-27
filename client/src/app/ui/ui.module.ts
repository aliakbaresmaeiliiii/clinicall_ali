import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireFunctionsModule } from '@angular/fire/compat/functions';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogModule } from '@angular/material/dialog';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatRadioModule } from '@angular/material/radio';
import { MatSidenavModule } from '@angular/material/sidenav';
import { RouterModule, RouterOutlet, Routes } from '@angular/router';
import { environment } from '../environments/environment';
import { ButtonComponent } from '../shared/components/button/button.component';
import { GoogleMapComponent } from '../shared/components/google-map/google-map.component';
import { SocialMediaIconComponent } from '../shared/components/social-media-icon/social-media-icon.component';
import { CounterDirective } from '../shared/directives/counter-number/counter.directive';
import { AboutUsComponent } from './about-us/about-us.component';
import { BestDoctorsComponent } from './best-doctors/best-doctors.component';
import { BlogComponent } from './blog/blog.component';
import { CitiesSupportComponent } from './cities-support/cities-support.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { DetailDrProjectComponent } from './detail-dr-project/detail-dr-project.component';
import { DoctorsComponent } from './doctors/doctors.component';
import { DrProjectsComponent } from './dr-projects/dr-projects.component';
import { FeatureSectionComponent } from './feature-section/feature-section.component';
import { FooterComponent } from './footer/footer.component';
import { AppScrollProgressBarComponent } from './header/app-scroll-progress-bar/app-scroll-progress-bar.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { MediicAppointmentComponent } from './mediic-appointment/mediic-appointment.component';
import { MenuComponent } from './mobile/menu/menu.component';
import { ProfilePatientComponent } from './profile-patient/profile-patient.component';
import { ServicesDoctorComponent } from './services-doctor/services-doctor.component';
import { CardInfoComponent } from './shared-ui/components/card-info/card-info.component';
import { SharedUiModule } from './shared-ui/shared-ui.module';
import { SliderComponent } from './slider/slider.component';
import { SpecialityComponent } from './speciality/speciality.component';
import { StepBookAppointmentComponent } from './step-book-appointment/step-book-appointment.component';
import { UserReviewsOfClinicAliComponent } from './user-reviews-of-clinic-ali/user-reviews-of-clinic-ali.component';
import { CustomTabComponent } from '../shared/components/custom-tab/custom-tab.component';

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
      { path: 'profile-pateint', component: ProfilePatientComponent },
      { path: 'speciality', component: SpecialityComponent },
      // {
      //   path: 'speciality',
      //   loadChildren: () => import('./speciality/speciality.module').then(c => c.SpecialityModule),
      // },
    ],
  },
];

@NgModule({
  declarations: [
    HeaderComponent,
    SliderComponent,
    FeatureSectionComponent,
    BestDoctorsComponent,
    BlogComponent,
    FooterComponent,
    DoctorsComponent,
    ServicesDoctorComponent,
    MediicAppointmentComponent,
    ContactUsComponent,
    DrProjectsComponent,
    DetailDrProjectComponent,
    MenuComponent,
    CitiesSupportComponent,
    UserReviewsOfClinicAliComponent,
    CardInfoComponent,
    HomeComponent,
    StepBookAppointmentComponent,
    SpecialityComponent
  ],
  imports: [
    CommonModule,
    RouterOutlet,
    RouterModule.forChild(routes),
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireFunctionsModule,
    FormsModule,
    ReactiveFormsModule,
    MatMenuModule,
    ButtonComponent,
    SocialMediaIconComponent,
    MatListModule,
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule,
    MatButtonModule,
    MatCardModule,
    GoogleMapComponent,
    AppScrollProgressBarComponent,
    CounterDirective,
    MatSidenavModule,
    MatRadioModule,
    MatExpansionModule,
    MatDialogModule,
    SharedUiModule,
    CustomTabComponent
    
    
    
  ],
  exports: [],
})
export class UiModule {}
