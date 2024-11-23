import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  HostBinding,
  HostListener,
  OnInit,
  input,
  output,
} from '@angular/core';
import { Highlightable } from '@angular/cdk/a11y';

@Component({
  selector: 'app-option',
  imports: [CommonModule],
  templateUrl: './option.component.html',
  styleUrl: './option.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OptionComponent<T> implements OnInit, Highlightable {
  readonly value = input<T | null>(null);

  readonly disabledReason = input('');

  @HostBinding('class.disabled')
  readonly disabledValue = input(false);

  readonly selected = output<OptionComponent<T>>();

  @HostListener('click')
  protected select() {
    if (!this.disabledValue()) {
      this.highlightAsSelected();
      this.selected.emit(this);
    }
  }
  @HostBinding('class.selected')
  protected isSelected = false;

  @HostBinding('class.active')
  protected isActive = false;

  constructor(
    private cd: ChangeDetectorRef,
    private el: ElementRef<HTMLElement>
  ) {}
  priority!: number;
  type!: HighlightType;

  setActiveStyles(): void {
    this.isActive = true;
    this.cd.markForCheck();
  }
  setInactiveStyles(): void {
    this.isActive = false;
    this.cd.markForCheck();
  }

  scrollIntoView(options?: ScrollIntoViewOptions) {
    this.el.nativeElement.scrollIntoView(options);
  }

  ngOnInit(): void {}

  highlightAsSelected() {
    this.isSelected = true;
    this.cd.markForCheck();
  }

  deselect() {
    this.isSelected = false;
    this.cd.markForCheck();
  }
}
