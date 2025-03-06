import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { BaseComponent } from '../../../../shared/components/base/base.component';
import { banWords } from '../../../../shared/validators/ban-words.validators';
import { ErrorStateMatcher } from '@angular/material/core';

@Component({
  selector: 'app-doctor-request',
  standalone: false,
  templateUrl: './doctor-request.component.html',
  styleUrl: './doctor-request.component.scss',
})
export class DoctorRequestComponent extends BaseComponent implements OnInit {
  matcher = new ErrorStateMatcher();

  form = this.fb.group({
    medicalCode: [null, [Validators.required]],
    firstName: ['', [Validators.required, banWords(['test', 'dummy'])]],
    lastName: [''],
    nationalCode: ['', [Validators.required]],
    email: ['', [Validators.email]],
    gender: [''],
    expertise: [''],
  });

  ngOnInit(): void {}

  sendRequest() {
  }
}
