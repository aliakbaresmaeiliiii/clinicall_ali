import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { CoreRoutingModule } from './core-routing.module';

@NgModule({
  declarations: [],
  imports: [CoreRoutingModule, SharedModule],
  exports: [],
})
export class CoreModule {}
