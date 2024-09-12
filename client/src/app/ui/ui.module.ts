import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { RouterModule, RouterOutlet, Routes } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { MatMenuModule } from '@angular/material/menu';
import { ButtonComponent } from '../shared/components/button/button.component';
import { SliderComponent } from './slider/slider.component';
import { ScrollAnimationDirective } from '../shared/directives/scroll-animation/scoll-animation.directive';
import { SocialMediaIconComponent } from '../shared/components/social-media-icon/social-media-icon.component';
import { FeatureSectionComponent } from './feature-section/feature-section.component';
import { CustomCardComponent } from '../shared/components/custom-card/custom-card.component';
import { MatListModule } from '@angular/material/list';
import { ServiceSectionComponent } from './service-section/service-section.component';
import Swiper from 'swiper/bundle';
import { BestDoctorsComponent } from './best-doctors/best-doctors.component';
import { BlogComponent } from './blog/blog.component';

const routes: Routes = [{ path: '', component: HomeComponent }];

@NgModule({
  declarations: [
    HomeComponent,
    HeaderComponent,
    SliderComponent,
    FeatureSectionComponent,
    ServiceSectionComponent,
    BestDoctorsComponent,
    BlogComponent
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
    
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class UiModule {}
