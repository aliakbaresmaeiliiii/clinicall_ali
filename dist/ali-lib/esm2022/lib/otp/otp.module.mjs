import { NgModule } from "@angular/core";
import { KeysPipe } from "./pipes/keys.pipe";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { NumberOnlyDirective, OtpInputComponent } from "../../public-api";
import { CountdownComponent } from "ngx-countdown";
import * as i0 from "@angular/core";
export class NgOtpInputModule {
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.0.0", ngImport: i0, type: NgOtpInputModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule }); }
    static { this.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "18.0.0", ngImport: i0, type: NgOtpInputModule, declarations: [OtpInputComponent, KeysPipe], imports: [CommonModule,
            FormsModule,
            ReactiveFormsModule,
            CountdownComponent,
            NumberOnlyDirective], exports: [OtpInputComponent] }); }
    static { this.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "18.0.0", ngImport: i0, type: NgOtpInputModule, providers: [KeysPipe], imports: [CommonModule,
            FormsModule,
            ReactiveFormsModule,
            CountdownComponent] }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.0.0", ngImport: i0, type: NgOtpInputModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        CommonModule,
                        FormsModule,
                        ReactiveFormsModule,
                        CountdownComponent,
                        NumberOnlyDirective,
                    ],
                    declarations: [OtpInputComponent, KeysPipe],
                    exports: [OtpInputComponent],
                    providers: [KeysPipe],
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3RwLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL2NsaWVudC9hbGktbGliL3NyYy9saWIvb3RwL290cC5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN6QyxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFDN0MsT0FBTyxFQUFFLG1CQUFtQixFQUFFLFdBQVcsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQ2xFLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMvQyxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxrQkFBa0IsQ0FBQztBQUMxRSxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSxlQUFlLENBQUM7O0FBY25ELE1BQU0sT0FBTyxnQkFBZ0I7OEdBQWhCLGdCQUFnQjsrR0FBaEIsZ0JBQWdCLGlCQUpaLGlCQUFpQixFQUFFLFFBQVEsYUFOeEMsWUFBWTtZQUNaLFdBQVc7WUFDWCxtQkFBbUI7WUFDbkIsa0JBQWtCO1lBQ2xCLG1CQUFtQixhQUdYLGlCQUFpQjsrR0FHaEIsZ0JBQWdCLGFBRmhCLENBQUMsUUFBUSxDQUFDLFlBUm5CLFlBQVk7WUFDWixXQUFXO1lBQ1gsbUJBQW1CO1lBQ25CLGtCQUFrQjs7MkZBT1QsZ0JBQWdCO2tCQVo1QixRQUFRO21CQUFDO29CQUNSLE9BQU8sRUFBRTt3QkFDUCxZQUFZO3dCQUNaLFdBQVc7d0JBQ1gsbUJBQW1CO3dCQUNuQixrQkFBa0I7d0JBQ2xCLG1CQUFtQjtxQkFDcEI7b0JBQ0QsWUFBWSxFQUFFLENBQUMsaUJBQWlCLEVBQUUsUUFBUSxDQUFDO29CQUMzQyxPQUFPLEVBQUUsQ0FBQyxpQkFBaUIsQ0FBQztvQkFDNUIsU0FBUyxFQUFFLENBQUMsUUFBUSxDQUFDO2lCQUN0QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcbmltcG9ydCB7IEtleXNQaXBlIH0gZnJvbSBcIi4vcGlwZXMva2V5cy5waXBlXCI7XG5pbXBvcnQgeyBSZWFjdGl2ZUZvcm1zTW9kdWxlLCBGb3Jtc01vZHVsZSB9IGZyb20gXCJAYW5ndWxhci9mb3Jtc1wiO1xuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSBcIkBhbmd1bGFyL2NvbW1vblwiO1xuaW1wb3J0IHsgTnVtYmVyT25seURpcmVjdGl2ZSwgT3RwSW5wdXRDb21wb25lbnQgfSBmcm9tIFwiLi4vLi4vcHVibGljLWFwaVwiO1xuaW1wb3J0IHsgQ291bnRkb3duQ29tcG9uZW50IH0gZnJvbSBcIm5neC1jb3VudGRvd25cIjtcblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW1xuICAgIENvbW1vbk1vZHVsZSxcbiAgICBGb3Jtc01vZHVsZSxcbiAgICBSZWFjdGl2ZUZvcm1zTW9kdWxlLFxuICAgIENvdW50ZG93bkNvbXBvbmVudCxcbiAgICBOdW1iZXJPbmx5RGlyZWN0aXZlLFxuICBdLFxuICBkZWNsYXJhdGlvbnM6IFtPdHBJbnB1dENvbXBvbmVudCwgS2V5c1BpcGVdLFxuICBleHBvcnRzOiBbT3RwSW5wdXRDb21wb25lbnRdLFxuICBwcm92aWRlcnM6IFtLZXlzUGlwZV0sXG59KVxuZXhwb3J0IGNsYXNzIE5nT3RwSW5wdXRNb2R1bGUge31cbiJdfQ==