import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { RouterModule, RouterOutlet, Routes } from '@angular/router';
import { ButtonComponent } from '../shared/components/button/button.component';
import { CustomCardComponent } from '../shared/components/custom-card/custom-card.component';
import { SocialMediaIconComponent } from '../shared/components/social-media-icon/social-media-icon.component';
import { ScrollAnimationDirective } from '../shared/directives/scroll-animation/scoll-animation.directive';
import { BestDoctorsComponent } from './best-doctors/best-doctors.component';
import { BlogComponent } from './blog/blog.component';
import { FeatureSectionComponent } from './feature-section/feature-section.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { ServiceSectionComponent } from './service-section/service-section.component';
import { SliderComponent } from './slider/slider.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { DoctorsComponent } from './doctors/doctors.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      {
        path: 'home',
        component: FeatureSectionComponent,
      },
      { path: 'doctors', component: DoctorsComponent },
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
  ],
  imports: [
    CommonModule,
    RouterOutlet,
    RouterModule.forChild(routes),
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
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class UiModule {}
