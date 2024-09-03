import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SelectComponent } from './select.component';
import { OverlayModule } from '@angular/cdk/overlay';
import { OptionComponent } from './option/option.component';
import * as i0 from "@angular/core";
export class SelectModule {
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.0.0", ngImport: i0, type: SelectModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule }); }
    static { this.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "18.0.0", ngImport: i0, type: SelectModule, declarations: [SelectComponent, OptionComponent], imports: [CommonModule, OverlayModule], exports: [SelectComponent, OptionComponent] }); }
    static { this.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "18.0.0", ngImport: i0, type: SelectModule, imports: [CommonModule, OverlayModule] }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.0.0", ngImport: i0, type: SelectModule, decorators: [{
            type: NgModule,
            args: [{
                    declarations: [SelectComponent, OptionComponent],
                    imports: [CommonModule, OverlayModule],
                    exports: [SelectComponent, OptionComponent],
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VsZWN0Lm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL2NsaWVudC9hbGktbGliL3NyYy9saWIvc2VsZWN0L3NlbGVjdC5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN6QyxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLG9CQUFvQixDQUFDO0FBQ3JELE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUNyRCxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sMkJBQTJCLENBQUM7O0FBUTVELE1BQU0sT0FBTyxZQUFZOzhHQUFaLFlBQVk7K0dBQVosWUFBWSxpQkFMUixlQUFlLEVBQUUsZUFBZSxhQUNyQyxZQUFZLEVBQUUsYUFBYSxhQUUzQixlQUFlLEVBQUUsZUFBZTsrR0FFL0IsWUFBWSxZQUpiLFlBQVksRUFBRSxhQUFhOzsyRkFJMUIsWUFBWTtrQkFOeEIsUUFBUTttQkFBQztvQkFDUixZQUFZLEVBQUUsQ0FBQyxlQUFlLEVBQUUsZUFBZSxDQUFDO29CQUNoRCxPQUFPLEVBQUUsQ0FBQyxZQUFZLEVBQUUsYUFBYSxDQUFDO29CQUV0QyxPQUFPLEVBQUUsQ0FBQyxlQUFlLEVBQUUsZUFBZSxDQUFDO2lCQUM1QyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgU2VsZWN0Q29tcG9uZW50IH0gZnJvbSAnLi9zZWxlY3QuY29tcG9uZW50JztcbmltcG9ydCB7IE92ZXJsYXlNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jZGsvb3ZlcmxheSc7XG5pbXBvcnQgeyBPcHRpb25Db21wb25lbnQgfSBmcm9tICcuL29wdGlvbi9vcHRpb24uY29tcG9uZW50JztcblxuQE5nTW9kdWxlKHtcbiAgZGVjbGFyYXRpb25zOiBbU2VsZWN0Q29tcG9uZW50LCBPcHRpb25Db21wb25lbnRdLFxuICBpbXBvcnRzOiBbQ29tbW9uTW9kdWxlLCBPdmVybGF5TW9kdWxlXSxcblxuICBleHBvcnRzOiBbU2VsZWN0Q29tcG9uZW50LCBPcHRpb25Db21wb25lbnRdLFxufSlcbmV4cG9ydCBjbGFzcyBTZWxlY3RNb2R1bGUge31cbiJdfQ==