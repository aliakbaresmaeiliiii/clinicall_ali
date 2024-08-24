import { AsyncPipe, CommonModule, NgTemplateOutlet } from '@angular/common';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Output,
  TemplateRef,
  input
} from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';

@Component({
  selector: 'generic-tab',
  standalone: true,
  imports: [MatTabsModule, NgTemplateOutlet, AsyncPipe, CommonModule],
  templateUrl: './custom-tab.component.html',
  styleUrl: './custom-tab.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CustomTabComponent implements AfterViewInit {
  tabs =
    input.required<
      { id: number; title: string; template: TemplateRef<any>; context?: any }[]
    >();

  @Output() selectedIndexChange = new EventEmitter<number>();
  selectedTemplate!: TemplateRef<any>;
  context: any;

  constructor() {}

  ngOnInit() {
    // if (this.tabs().length > 0) {
    //   this.setSelectedTab(0);
    // }
  }
  ngAfterViewInit() {
    const data = this.tabs();
    if (data.length > 0) {
      this.setSelectedTab(0);
    }
  }

  onTabChanged(index: number) {
    if (this.tabs().length > index) {
      this.setSelectedTab(index);
      this.selectedIndexChange.emit(index);
    }
  }

  private setSelectedTab(index: number) {
    const selectedTab = this.tabs()[index];
    this.selectedTemplate = selectedTab.template;
    this.context = { $implicit: selectedTab.context };
  }
}
