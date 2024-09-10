import { Component, OnInit, computed, effect, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LayoutComponent } from './core/layouts/layout.component';
import { NgProgressModule } from 'ngx-progressbar';
import { GoogleMapComponent } from './shared/components/google-map/google-map.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    LayoutComponent,
    NgProgressModule,
    GoogleMapComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  constructor() {}
  ngOnInit(): void {}
}
