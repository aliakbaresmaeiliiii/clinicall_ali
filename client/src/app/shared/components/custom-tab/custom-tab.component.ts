import { AsyncPipe, CommonModule, NgTemplateOutlet } from '@angular/common';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
  TemplateRef,
  input,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatTabsModule } from '@angular/material/tabs';

@Component({
  selector: 'generic-tab',
  standalone: true,
  imports: [MatTabsModule, NgTemplateOutlet, CommonModule, MatButtonModule],
  providers: [AsyncPipe],
  templateUrl: './custom-tab.component.html',
  styleUrl: './custom-tab.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CustomTabComponent implements AfterViewInit {
  tabs = input.required<
    {
      id: number;
      title: string;
      template: TemplateRef<any>;
      disabled: boolean;
      context?: any;
    }[]
  >();

  @Output() selectedIndexChange = new EventEmitter<number>();
  selectedTemplate!: TemplateRef<any>;
  context: any;
  @Input() selectedIndex = 0;

  constructor() {}

  ngOnInit() {}

  ngAfterViewInit() {
    const data = this.tabs();
    if (data.length > 0) {
      this.setSelectedTab(0);
    }
  }

  onTabChanged(data: any) {
    if (this.tabs().length > data.index) {
      this.setSelectedTab(data.index);
      this.selectedIndexChange.emit(data.index);
    }
  }

  private setSelectedTab(index: number) {
    const selectedTab = this.tabs()[index];
    this.selectedTemplate = selectedTab.template;
    this.context = { $implicit: selectedTab.context };
  }

}
