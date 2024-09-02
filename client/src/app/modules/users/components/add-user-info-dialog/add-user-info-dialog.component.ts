import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import { Observable, tap } from 'rxjs';
import { banWords } from '../../../../shared/validators/ban-words.validators';
import { passswordShouldMatch } from '../../../../shared/validators/password-should-math.validator';
import { CustomersService } from '../../services/customers.service';

@Component({
  selector: 'app-add-user-info-dialog',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './add-user-info-dialog.component.html',
  styleUrl: './add-user-info-dialog.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddUserInfoDialogComponent implements OnInit {
  years = this.getYears();
  phoneLabels = ['Main', 'Mobile', 'Work', 'Home'];
  skiil$!: Observable<string[]>;

  form = this.fb.group({
    firstName: [
      'ali',
      [
        Validators.required,
        Validators.minLength(3),
        banWords(['test', 'dummy']),
      ],
    ],
    lastName: [
      'es',
      [
        Validators.required,
        Validators.minLength(2),
        banWords(['ali', 'dummy']),
      ],
    ],
    nikname: [
      '',
      [
        Validators.required,
        Validators.minLength(2),
        Validators.pattern(/^[\w.]+$/),
        banWords(['test', 'dummy']),
      ],
    ],
    email: [
      'aliakbaresmaeili98@gmail.com',
      [Validators.required, Validators.email],
    ],
    yearOfBirth: this.fb.nonNullable.control(
      this.years[this.years.length - 1],
      Validators.required
    ),
    passport: ['', [Validators.pattern(/^[A-Z]{2}[0-9]{6}$/)]],
    address: this.fb.nonNullable.group({
      fullAddress: ['', Validators.required],
      city: ['', Validators.required],
      postCode: [0, Validators.required],
    }),
    phones: this.fb.array([
      this.fb.group(
        {
          label: this.fb.nonNullable.control(this.phoneLabels[0]),
          phone: '',
        },
        
      ),
    ]),
    skills: this.fb.record<boolean>({}),

    password: this.fb.group({
      password: ['', Validators.required, Validators.minLength(6)],
      confirmPassword: '',
    },
    {
      validators: passswordShouldMatch,
    }),
  });

  constructor(private service: CustomersService, private fb: FormBuilder) {}

  ngOnInit(): void {
    // this.skiil$ = this.service
    //   .getSkills()
    //   .pipe(tap(skills => this.buildSkillControls(skills)));
    // // for get value during time
    // // this.form.controls.firstName.valueChanges.pipe(
    // //   debounceTime(100),
    // //   distinctUntilChanged()
    // // ).subscribe((res)=>{
    // // })
  }
  addPhone() {
    this.form.controls.phones.insert(
      0,
      new FormGroup({
        label: new FormControl(this.phoneLabels[0], { nonNullable: true }),
        phone: new FormControl(''),
      })
    );
  }
  removePhone(i: number) {
    this.form.controls.phones.removeAt(i);
  }

  onSubmit(e: Event) {
    this.form.reset();
  }

  private buildSkillControls(skills: string[]) {
    skills.forEach(skill =>
      this.form.controls.skills.addControl(
        skill,
        new FormControl(false, { nonNullable: true })
      )
    );
  }
  private getYears() {
    const now = new Date().getUTCFullYear();
    return Array(now - (now - 40))
      .fill('')
      .map((_, idx) => now - idx);
  }
}
