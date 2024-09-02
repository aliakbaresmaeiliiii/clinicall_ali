import {
  Component,
  EventEmitter,
  HostBinding,
  HostListener,
  Input,
  OnInit,
  Output,
} from '@angular/core';

@Component({
  selector: 'lib-option',
  standalone: false,
  templateUrl: './option.component.html',
  styleUrl: './option.component.scss',
})
export class OptionComponent implements OnInit {
  @Input()
  value: string | null = null;
  @Input()
  disableReason = '';

  @Input()
  @HostBinding('class.disabled')
  disabled = false;

  @Output()
  selected = new EventEmitter<OptionComponent>();

  @HostListener('click')
  protected select() {
    if (!this.disabled) {
      this.highlightAsSelected();
      this.selected.emit(this);
    }
  }

  @HostBinding('class.selected')
  protected isSelected = false;

  ngOnInit(): void {}

  highlightAsSelected() {
    this.isSelected = true;
  }
  deselect() {
    this.isSelected = false;
  }
}
