import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
    selector: 'app-footer',
    templateUrl: './footer.component.html',
    styleUrl: './footer.component.scss',
    standalone: true,
    imports:[FormsModule,CommonModule,ReactiveFormsModule]

})
export class FooterComponent {
  form = new FormGroup({
    email: new FormControl('', [ Validators.email]),
    condition: new FormControl(''),
  });

  onSubmit(){
    
  }
  get email() {
    return this.form.get('email');
  }
}
