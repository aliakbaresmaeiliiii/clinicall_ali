import {
  Component,
  HostBinding,
  HostListener,
  OnInit,
  input,
  output,
} from "@angular/core";

@Component({
  selector: "lib-option",
  standalone: false,
  templateUrl: "./option.component.html",
  styleUrl: "./option.component.scss",
})
export class OptionComponent implements OnInit {
  readonly value = input<string | null>(null);
  readonly disableReason = input("");

  @HostBinding("class.disabled")
  readonly disabled = input(false);

  readonly selected = output<OptionComponent>();

  @HostListener("click")
  protected select() {
    if (!this.disabled()) {
      this.highlightAsSelected();
      this.selected.emit(this);
    }
  }

  @HostBinding("class.selected")
  protected isSelected = false;

  ngOnInit(): void {}

  highlightAsSelected() {
    this.isSelected = true;
  }
  deselect() {
    this.isSelected = false;
  }
}
