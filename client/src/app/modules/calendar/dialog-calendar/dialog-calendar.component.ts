import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { banWords } from '../../../shared/validators/ban-words.validators';

@Component({
  selector: 'app-dialog-calendar',
  standalone: false,
  templateUrl: './dialog-calendar.component.html',
  styleUrl: './dialog-calendar.component.scss',
})
export class DialogCalendarComponent {
  title: string = 'Create Appointment';
  value = 'Clear me';
  date: any;
  selectedColor: any;
  form!: FormGroup;
  colors: string[] = ['#FF0000', '#00FF00', '#0000FF'];

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<DialogCalendarComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.date = data.data.date;
    setTimeout(() => {
      this.title = 'testing change detection'
    }, 2000);
  }

  ngOnInit(): void {
    this.createForm();
    if (this.data.data) {
      this.updateForm();
    }

    this.form.get('color')?.valueChanges.subscribe(value => {
      this.selectedColor = value;
    });
  }

  createForm() {
    this.form = this.fb.group({
      event_title: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          banWords(['test', 'dummy']),
        ],
      ],
      event_description: [''],
      color: ['#FF0000'],
    });
  }

  onColorChange(event: any) {
    this.selectedColor = event.value;
  }

  submit() {
    this.dialogRef.close(this.form.value);
  }

  updateForm() {
    this.form.patchValue({
      event_title: this.data.data.dataList[0]?.event_title,
      event_description: this.data.data.dataList[0]?.event_description,
      color: this.data.data.dataList[0]?.color,
    });
    this.selectedColor = this.form.get('color')?.value;
  }
}
