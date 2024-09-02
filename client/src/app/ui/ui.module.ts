import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './header/header.component';

@NgModule({
  declarations: [HomeComponent, HeaderComponent],
  imports: [CommonModule, RouterOutlet],
})
export class UiModule {}
