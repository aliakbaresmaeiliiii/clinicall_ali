import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { ModulesRoutingModule } from './modules-routing.module';
import { ModulesComponent } from './profile.component';
import { FilterComponent } from './users/filter/filter.component';
@NgModule({
  declarations: [ModulesComponent,FilterComponent],
  imports: [ModulesRoutingModule, SharedModule, ],
})
export class ModulesModule {}
