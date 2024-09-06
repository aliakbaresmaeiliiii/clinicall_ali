import { Directive, inject, Input, OnInit } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import { AgePipe } from '../../pipes/age.pipe';

@Directive({
  selector: '[appAgeValidator]',
  standalone: true,
})
export class AgeValidatorDirective implements OnInit {
  // @Input('appAgeValidator') formGroup!: FormGroup;
  @Input() formGroup!: FormGroup;  
  @Input() dateOfBirthControl!: string;
  @Input() ageControl!: string;

  agePipe = inject(AgePipe);

  ngOnInit(): void {
    const dateOfBirth: AbstractControl = this.formGroup.controls[this.dateOfBirthControl];
    const age: AbstractControl = this.formGroup.controls[this.ageControl];
    dateOfBirth.valueChanges.subscribe(date => {
      if (date) {
        const calculatedAge = this.agePipe.transform(date);
        age.setValue(calculatedAge, { emitEvent: false });
      }
    });
  }
}
