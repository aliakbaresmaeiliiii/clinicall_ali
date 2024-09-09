import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
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

const routes: Routes = [{ path: '', component: HomeComponent }];

@NgModule({
  declarations: [
    HomeComponent,
    HeaderComponent,
    SliderComponent,
    FeatureSectionComponent,
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

  ],
})
export class UiModule {}
