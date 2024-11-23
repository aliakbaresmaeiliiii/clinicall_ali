import { Directive, inject, OnInit, input } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import { AgePipe } from '../../pipes/age.pipe';

@Directive({
  selector: '[appAgeValidator]',
  standalone: true,
})
export class AgeValidatorDirective implements OnInit {
  // @Input('appAgeValidator') formGroup!: FormGroup;
  readonly formGroup = input.required<FormGroup>();  
  readonly dateOfBirthControl = input.required<string>();
  readonly ageControl = input.required<string>();

  agePipe = inject(AgePipe);

  ngOnInit(): void {
    const dateOfBirth: AbstractControl = this.formGroup().controls[this.dateOfBirthControl()];
    const age: AbstractControl = this.formGroup().controls[this.ageControl()];
    dateOfBirth.valueChanges.subscribe(date => {
      if (date) {
        const calculatedAge = this.agePipe.transform(date);
        age.setValue(calculatedAge, { emitEvent: false });
      }
    });
  }
}
