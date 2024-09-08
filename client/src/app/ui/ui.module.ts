import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, RouterOutlet, Routes } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { MatMenuModule } from '@angular/material/menu';
import { ButtonComponent } from '../shared/components/button/button.component';
import { SliderComponent } from './slider/slider.component';

const routes: Routes = [{ path: '', component: HomeComponent }];

@NgModule({
  declarations: [HomeComponent, HeaderComponent, SliderComponent],
  imports: [
    CommonModule,
    RouterOutlet,
    RouterModule.forChild(routes),
    MatMenuModule,
    ButtonComponent,
  ],
})
export class UiModule {}
