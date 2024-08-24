import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { CoreRoutingModule } from './core-routing.module';
import { CustomTabComponent } from '../shared/components/custom-tab/custom-tab.component';

@NgModule({
  declarations: [],
  imports: [CoreRoutingModule, CustomTabComponent, SharedModule],
  exports: [],
})
export class CoreModule {}
