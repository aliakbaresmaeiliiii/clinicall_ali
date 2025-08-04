import { ChangeDetectionStrategy, Component, Input, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

const today = new Date();
const month = today.getMonth();
const year = today.getFullYear();

@Component({
  selector: 'app-range-picker',
  templateUrl: './range-picker.component.html',
  styleUrl: './range-picker.component.scss',
  standalone: false,
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class RangePickerComponent {


  @Input() campaignOneStart: Date = new Date();
  @Input() campaignOneEnd: Date = new Date();
  @Input() campaignTwoStart: Date = new Date();
  @Input() campaignTwoEnd: Date = new Date();


  
  readonly campaignOne = new FormGroup({
    start: new FormControl(new Date(year, month, 13) ),
    end: new FormControl(new Date(year, month, 16)),
  });

  readonly campaignTwo = new FormGroup({
    start: new FormControl(new Date(year, month, 15)),
    end: new FormControl(new Date(year, month, 19)),
  });



  ngOnChanges(changes: SimpleChanges): void {
    if (changes['campaignOneStart']) {
      this.campaignOne.controls.start.setValue(this.campaignOneStart);
    }
    if (changes['campaignOneEnd']) {
      this.campaignOne.controls.end.setValue(this.campaignOneEnd);
    }
    if (changes['campaignTwoStart']) {
      this.campaignTwo.controls.start.setValue(this.campaignTwoStart);
    }
    if (changes['campaignTwoEnd']) {
      this.campaignTwo.controls.end.setValue(this.campaignTwoEnd);
    }
  }
}
