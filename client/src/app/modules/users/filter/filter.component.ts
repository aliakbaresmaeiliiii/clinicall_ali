import { Component, model } from '@angular/core';
@Component({
    selector: 'app-filter',
    templateUrl: './filter.component.html',
    styleUrl: './filter.component.scss',
    standalone:false,
})
export class FilterComponent {
  filterKeyword = model('');


}
