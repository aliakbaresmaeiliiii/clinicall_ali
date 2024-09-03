import { NgModule } from '@angular/core';
import { KeysPipe } from './pipes/keys.pipe';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NumberOnlyDirective, OtpInputComponent } from '../../public-api';
import { CountdownComponent } from 'ngx-countdown';
import * as i0 from "@angular/core";
export class NgOtpInputModule {
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.0.0", ngImport: i0, type: NgOtpInputModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule }); }
    static { this.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "18.0.0", ngImport: i0, type: NgOtpInputModule, declarations: [OtpInputComponent, KeysPipe], imports: [CommonModule, FormsModule, ReactiveFormsModule, CountdownComponent, NumberOnlyDirective], exports: [OtpInputComponent] }); }
    static { this.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "18.0.0", ngImport: i0, type: NgOtpInputModule, providers: [KeysPipe], imports: [CommonModule, FormsModule, ReactiveFormsModule, CountdownComponent] }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.0.0", ngImport: i0, type: NgOtpInputModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule, FormsModule, ReactiveFormsModule, CountdownComponent, NumberOnlyDirective],
                    declarations: [OtpInputComponent, KeysPipe,],
                    exports: [OtpInputComponent],
                    providers: [KeysPipe],
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3RwLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL2NsaWVudC9hbGktbGliL3NyYy9saWIvb3RwL290cC5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN6QyxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFDN0MsT0FBTyxFQUFFLG1CQUFtQixFQUFFLFdBQVcsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQ2xFLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMvQyxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxrQkFBa0IsQ0FBQztBQUMxRSxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSxlQUFlLENBQUM7O0FBUW5ELE1BQU0sT0FBTyxnQkFBZ0I7OEdBQWhCLGdCQUFnQjsrR0FBaEIsZ0JBQWdCLGlCQUpaLGlCQUFpQixFQUFFLFFBQVEsYUFEaEMsWUFBWSxFQUFFLFdBQVcsRUFBRSxtQkFBbUIsRUFBQyxrQkFBa0IsRUFBQyxtQkFBbUIsYUFFckYsaUJBQWlCOytHQUdoQixnQkFBZ0IsYUFGaEIsQ0FBQyxRQUFRLENBQUMsWUFIWCxZQUFZLEVBQUUsV0FBVyxFQUFFLG1CQUFtQixFQUFDLGtCQUFrQjs7MkZBS2hFLGdCQUFnQjtrQkFONUIsUUFBUTttQkFBQztvQkFDUixPQUFPLEVBQUUsQ0FBQyxZQUFZLEVBQUUsV0FBVyxFQUFFLG1CQUFtQixFQUFDLGtCQUFrQixFQUFDLG1CQUFtQixDQUFDO29CQUNoRyxZQUFZLEVBQUUsQ0FBQyxpQkFBaUIsRUFBRSxRQUFRLEVBQUc7b0JBQzdDLE9BQU8sRUFBRSxDQUFDLGlCQUFpQixDQUFDO29CQUM1QixTQUFTLEVBQUUsQ0FBQyxRQUFRLENBQUM7aUJBQ3RCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEtleXNQaXBlIH0gZnJvbSAnLi9waXBlcy9rZXlzLnBpcGUnO1xuaW1wb3J0IHsgUmVhY3RpdmVGb3Jtc01vZHVsZSwgRm9ybXNNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgTnVtYmVyT25seURpcmVjdGl2ZSwgT3RwSW5wdXRDb21wb25lbnQgfSBmcm9tICcuLi8uLi9wdWJsaWMtYXBpJztcbmltcG9ydCB7IENvdW50ZG93bkNvbXBvbmVudCB9IGZyb20gJ25neC1jb3VudGRvd24nO1xuXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbQ29tbW9uTW9kdWxlLCBGb3Jtc01vZHVsZSwgUmVhY3RpdmVGb3Jtc01vZHVsZSxDb3VudGRvd25Db21wb25lbnQsTnVtYmVyT25seURpcmVjdGl2ZV0sXG4gIGRlY2xhcmF0aW9uczogW090cElucHV0Q29tcG9uZW50LCBLZXlzUGlwZSwgXSxcbiAgZXhwb3J0czogW090cElucHV0Q29tcG9uZW50XSxcbiAgcHJvdmlkZXJzOiBbS2V5c1BpcGVdLFxufSlcbmV4cG9ydCBjbGFzcyBOZ090cElucHV0TW9kdWxlIHt9XG4iXX0=