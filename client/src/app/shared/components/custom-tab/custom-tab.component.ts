import { AsyncPipe, CommonModule } from '@angular/common';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  TemplateRef,
  input,
  output
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatTabsModule } from '@angular/material/tabs';

@Component({
    selector: 'generic-tab',
    imports: [MatTabsModule, CommonModule, MatButtonModule],
    providers: [AsyncPipe],
    templateUrl: './custom-tab.component.html',
    styleUrl: './custom-tab.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush
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

  readonly selectedIndexChange = output<number>();
  selectedTemplate!: TemplateRef<any>;
  context: any;
  readonly selectedIndex = input(0);

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
