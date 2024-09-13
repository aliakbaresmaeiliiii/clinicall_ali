import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss',
})
export class FooterComponent {
  form = new FormGroup({
    email: new FormControl('', [ Validators.email]),
    condition: new FormControl(''),
  });

  get email() {
    return this.form.get('email');
  }
}
