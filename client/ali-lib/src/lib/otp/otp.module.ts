import { NgModule } from "@angular/core";
import { KeysPipe } from "./pipes/keys.pipe";
import { CommonModule } from "@angular/common";
import { NumberOnlyDirective, OtpInputComponent } from "../../public-api";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

@NgModule({
  imports: [CommonModule, FormsModule, ReactiveFormsModule, ],
  declarations: [OtpInputComponent, NumberOnlyDirective, KeysPipe],
  exports: [OtpInputComponent],
  providers: [KeysPipe],
})
export class NgOtpInputModule {}
