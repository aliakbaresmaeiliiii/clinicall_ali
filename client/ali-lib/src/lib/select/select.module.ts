import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SelectComponent } from "./select.component";
import { OverlayModule } from "@angular/cdk/overlay";
import { OptionComponent } from "./option/option.component";

@NgModule({
  declarations: [OptionComponent, SelectComponent],
  imports: [CommonModule, OverlayModule],

  exports: [OptionComponent, SelectComponent],
})
export class SelectModule {}
