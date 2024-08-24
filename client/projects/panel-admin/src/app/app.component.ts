import { Component, OnInit, computed, effect, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LayoutComponent } from './core/layouts/layout.component';
import { NgProgressModule } from 'ngx-progressbar';
import { GoogleMapComponent } from './shared/components/google-map/google-map.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,LayoutComponent,NgProgressModule,GoogleMapComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit{
  // price = 100;
  // quantity = signal(1);
  // id = signal(0);
  // autoUpdated = true;
  // total = computed(() => {
  //   if (this.autoUpdated) {
  //     return this.price * this.quantity();
  //   } else {
  //     return 0;
  //   }
  // });

  constructor() {
  }
  ngOnInit(): void {
    
  }

  // plus() {
  //   this.quantity.update(value => value + 1);
  //   this.id.set(Math.random());
  // }
  // minus() {
  //   this.quantity.update(value => value - 1);
  // }
}
