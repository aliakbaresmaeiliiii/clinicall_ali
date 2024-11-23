import { Component } from '@angular/core';
import { Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { BaseComponent } from '../../../../shared/components/base/base.component';

@Component({
    selector: 'app-add-new-connection',
    templateUrl: './add-new-connection.component.html',
    styleUrl: './add-new-connection.component.scss',
    standalone: false
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
