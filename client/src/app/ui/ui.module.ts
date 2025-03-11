import { CommonModule, DatePipe } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
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
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule, RouterOutlet, Routes } from '@angular/router';
import { NgxStarsModule } from 'ngx-stars';
import { environment } from '../environments/environment';
import { ButtonComponent } from '../shared/components/button/button.component';
import { CustomTabComponent } from './shared-ui/components/custom-tab/custom-tab.component';
import { GoogleMapComponent } from '../shared/components/google-map/google-map.component';
import { LoaderComponent } from '../shared/components/loader/loader.component';
import { SocialMediaIconComponent } from '../shared/components/social-media-icon/social-media-icon.component';
import { CounterDirective } from '../shared/directives/counter-number/counter.directive';
import { FloorPipe } from '../shared/pipes/floor.pipe';
import { AboutUsComponent } from './about-us/about-us.component';
import { BestDoctorsComponent } from './best-doctors/best-doctors.component';
import { BlogComponent } from './blog/blog.component';
import { BookAppointmentComponent } from './book-appointment/book-appointment.component';
import { CitiesSupportComponent } from './cities-support/cities-support.component';
import { ClinicInfoComponent } from './clinic-info/clinic-info.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { DentalServiceComponent } from './dental-service/dental-service.component';
import { DermatologyHairComponent } from './dermatology-hair/dermatology-hair.component';
import { DetailDrProjectComponent } from './detail-dr-project/detail-dr-project.component';
import { DoctorRequestComponent } from './doctors/components/doctor-request/doctor-request.component';
import { DoctorsComponent } from './doctors/components/doctors.component';
import { DrProjectsComponent } from './dr-projects/dr-projects.component';
import { FeatureSectionComponent } from './feature-section/feature-section.component';
import { FilterLayoutComponent } from './filter-layout/filter-layout.component';
import { FooterComponent } from './footer/footer.component';
import { DialogLocationDrComponent } from './get-doctor-apointment/dialog-location-dr/dialog-location-dr.component';
import { DilogDotorAppointmentComponent } from './get-doctor-apointment/dilog-dotor-appointment/dilog-dotor-appointment.component';
import { GetDoctorApointmentComponent } from './get-doctor-apointment/get-doctor-apointment.component';
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
import { SuggestionReplacedDoctorComponent } from './suggestion-replaced-doctor/suggestion-replaced-doctor.component';
import { SuggestionsDentalComponent } from './suggestions-dental/suggestions-dental.component';
import { SuggestionsOphthalmologyTipsComponent } from './suggestions-ophthalmology-tips/suggestions-ophthalmology-tips.component';
import { SuggestionsPsychologyTipsComponent } from './suggestions-psychology-tips/suggestions-psychology-tips.component';
import { SuggestionsRhinoplastyTipsComponent } from './suggestions-rhinoplasty-tips/suggestions-rhinoplasty-tips.component';
import { SuggestionsSkinHairComponent } from './suggestions-skin-hair/suggestions-skin-hair.component';
import { SuggestionsUrologyTipsComponent } from './suggestions-urology-tips/suggestions-urology-tips.component';
import { SuggestionsComponent } from './suggestions/suggestions.component';
import { SuggustionsServiceComponent } from './suggustions-service/suggustions-service.component';
import { UserReviewsOfClinicAliComponent } from './user-reviews-of-clinic-ali/user-reviews-of-clinic-ali.component';
import { YoursDoctorComponent } from './yours-doctor/yours-doctor.component';
import { MatIconModule } from '@angular/material/icon';
import { OnlineConsultaionDialogComponent } from './filter-layout/online-consultaion-dialog/online-consultaion-dialog.component';
import { ChoosingAppointmentComponent } from './filter-layout/choosing-appointment/choosing-appointment.component';
import { ToBooleanPipe } from '../shared/pipes/to-boolean.pipe';
import { MatTooltipModule } from '@angular/material/tooltip';
import { SharedModule } from '../shared/shared.module';
import { RecaptchaModule } from "ng-recaptcha";

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      {
        path: '',
        component: FeatureSectionComponent,
      },
      {
        path: 'doctors',
        component: FilterLayoutComponent,
      },
      {
        path: 'doctors/request',
        component: DoctorRequestComponent,
      },

      {
        path: 'profile',
        loadChildren: () =>
          import('./user-profile/user-profile.module').then(
            m => m.UserProfileModule
          ),
      },

      { path: 'services', component: ServicesDoctorComponent },
      { path: 'contact-us', component: ContactUsComponent },
      { path: 'about-us', component: AboutUsComponent },
      { path: 'dr-projects', component: DrProjectsComponent },
      { path: 'detail-dr-project', component: DetailDrProjectComponent },
      { path: 'profile-pateint', component: ProfilePatientComponent },
      { path: 'speciality', component: SpecialityComponent },
      {
        path: 'doctor/:name/:id',
        component: GetDoctorApointmentComponent,
      },
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
    SpecialityComponent,
    SuggustionsServiceComponent,
    ClinicInfoComponent,
    DermatologyHairComponent,
    BookAppointmentComponent,
    SuggestionsSkinHairComponent,
    DentalServiceComponent,
    SuggestionsPsychologyTipsComponent,
    SuggestionsOphthalmologyTipsComponent,
    SuggestionsUrologyTipsComponent,
    SuggestionsRhinoplastyTipsComponent,
    SuggestionsComponent,
    YoursDoctorComponent,
    SuggestionsDentalComponent,
    FilterLayoutComponent,
    GetDoctorApointmentComponent,
    DilogDotorAppointmentComponent,
    DialogLocationDrComponent,
    SuggestionReplacedDoctorComponent,
    DoctorsComponent,
    DoctorRequestComponent,
    OnlineConsultaionDialogComponent,
    ChoosingAppointmentComponent,
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
    LoaderComponent,
    FloorPipe,
    MatTabsModule,
    NgxStarsModule,
    MatToolbarModule,
    MatIconModule,
    ToBooleanPipe,
    MatTooltipModule,
    SharedModule,
    RecaptchaModule,
  ],
  exports: [BlogComponent, MatToolbarModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [DatePipe, ToBooleanPipe, ToBooleanPipe],
})
export class UiModule {}
