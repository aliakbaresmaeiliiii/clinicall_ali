import {
  Component,
  EventEmitter,
  Input,
  Output
} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-generic-auto-compelete',
  standalone: false,
  templateUrl: './generic-auto-compelete.component.html',
  styleUrl: './generic-auto-compelete.component.scss',
})
export class GenericAutoCompeleteComponent {
  @Input() label!: string;
  @Input() placeHolder!: string;
  @Input() parentForm!: FormGroup;
  @Input() formCrName!: string;
  @Input() filterOption!: Observable<{ name: string, id: number }[]>;
  @Output() valueInput = new EventEmitter<any>();


  onValueChange(inputValue: any) {
    this.valueInput.emit(inputValue);
  }
}
