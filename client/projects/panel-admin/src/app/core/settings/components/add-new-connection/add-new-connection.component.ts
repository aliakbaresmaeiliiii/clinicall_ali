import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { BaseComponent } from '../../../../shared/components/base/base.component';
import { ErrorStateMatcher } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-add-new-connection',
  standalone: true,
  imports: [
    MatCardModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ],
  templateUrl: './add-new-connection.component.html',
  styleUrl: './add-new-connection.component.scss',
})
export class AddNewConnectionComponent extends BaseComponent {
  form = this.fb.group({
    facebookLink: ['', [Validators.required, Validators.minLength(3)]],
    twitterLink: ['', [Validators.required, Validators.minLength(3)]],
    youTubeLink: ['', [Validators.required, Validators.minLength(3)]],
    linkedInLink: ['', [Validators.required, Validators.minLength(3)]],
    dribbbleLink: ['', [Validators.required, Validators.minLength(3)]],
    twitchLink: ['', [Validators.required, Validators.minLength(3)]],
  });
  matcher = new ErrorStateMatcher();

  onSubmit() {}

  // getFormControl
  get facebookLink(){
    return this.form.get('facebookLink')
  }
  get twitterLink(){
    return this.form.get('twitterLink')
  }
  get youTubeLink(){
    return this.form.get('youTubeLink')
  }
  get linkedInLink(){
    return this.form.get('linkedInLink')
  }
  get dribbbleLink(){
    return this.form.get('dribbbleLink')
  }
  get twitchLink(){
    return this.form.get('twitchLink')
  }
}
