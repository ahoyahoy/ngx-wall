/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { StickyModalModule } from 'ngx-sticky-modal';
import { VideoBrickTextRepresentationClass } from '../video-brick/video-brick-text-representation.class';
import { InputContextComponent } from './input-context/input-context.component';
import { WebBookmarkBrickComponent } from './component/web-bookmark-brick.component';
import { MatButtonModule, MatFormFieldModule, MatInputModule } from '@angular/material';
import { TowModule } from '../../modules/tow/tow.module';
import { HelperComponentsModule } from '../../modules/helper-components/helper-components.module';
import { BrickRegistry } from '../../wall/registry/brick-registry.service';
var WebBookmarkBrickModule = /** @class */ (function () {
    function WebBookmarkBrickModule(brickRegistry) {
        this.brickRegistry = brickRegistry;
        this.brickRegistry.register({
            tag: 'webbookmark',
            component: WebBookmarkBrickComponent,
            textRepresentation: VideoBrickTextRepresentationClass,
            name: 'Web Bookmark',
            description: 'Save a link as a visual bookmark'
        });
    }
    WebBookmarkBrickModule.decorators = [
        { type: NgModule, args: [{
                    imports: [
                        CommonModule,
                        StickyModalModule,
                        HelperComponentsModule,
                        TowModule,
                        MatButtonModule,
                        MatInputModule,
                        MatFormFieldModule
                    ],
                    exports: [
                        WebBookmarkBrickComponent
                    ],
                    declarations: [
                        InputContextComponent,
                        WebBookmarkBrickComponent
                    ],
                    entryComponents: [
                        InputContextComponent,
                        WebBookmarkBrickComponent
                    ],
                    providers: []
                },] }
    ];
    /** @nocollapse */
    WebBookmarkBrickModule.ctorParameters = function () { return [
        { type: BrickRegistry }
    ]; };
    return WebBookmarkBrickModule;
}());
export { WebBookmarkBrickModule };
if (false) {
    /**
     * @type {?}
     * @private
     */
    WebBookmarkBrickModule.prototype.brickRegistry;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2ViLWJvb2ttYXJrLWJyaWNrLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25neC13YWxsLyIsInNvdXJjZXMiOlsibGliL2JyaWNrcy93ZWItYm9va21hcmstYnJpY2svd2ViLWJvb2ttYXJrLWJyaWNrLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFDLFlBQVksRUFBQyxNQUFNLGlCQUFpQixDQUFDO0FBQzdDLE9BQU8sRUFBQyxRQUFRLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDdkMsT0FBTyxFQUFDLGlCQUFpQixFQUFDLE1BQU0sa0JBQWtCLENBQUM7QUFDbkQsT0FBTyxFQUFDLGlDQUFpQyxFQUFDLE1BQU0sc0RBQXNELENBQUM7QUFDdkcsT0FBTyxFQUFDLHFCQUFxQixFQUFDLE1BQU0seUNBQXlDLENBQUM7QUFDOUUsT0FBTyxFQUFDLHlCQUF5QixFQUFDLE1BQU0sMENBQTBDLENBQUM7QUFDbkYsT0FBTyxFQUFDLGVBQWUsRUFBRSxrQkFBa0IsRUFBRSxjQUFjLEVBQUMsTUFBTSxtQkFBbUIsQ0FBQztBQUN0RixPQUFPLEVBQUMsU0FBUyxFQUFDLE1BQU0sOEJBQThCLENBQUM7QUFDdkQsT0FBTyxFQUFDLHNCQUFzQixFQUFDLE1BQU0sMERBQTBELENBQUM7QUFDaEcsT0FBTyxFQUFDLGFBQWEsRUFBQyxNQUFNLDRDQUE0QyxDQUFDO0FBRXpFO0lBd0JJLGdDQUFvQixhQUE0QjtRQUE1QixrQkFBYSxHQUFiLGFBQWEsQ0FBZTtRQUM1QyxJQUFJLENBQUMsYUFBYSxDQUFDLFFBQVEsQ0FBQztZQUN4QixHQUFHLEVBQUUsYUFBYTtZQUNsQixTQUFTLEVBQUUseUJBQXlCO1lBQ3BDLGtCQUFrQixFQUFFLGlDQUFpQztZQUNyRCxJQUFJLEVBQUUsY0FBYztZQUNwQixXQUFXLEVBQUUsa0NBQWtDO1NBQ2xELENBQUMsQ0FBQztJQUNQLENBQUM7O2dCQWhDSixRQUFRLFNBQUM7b0JBQ04sT0FBTyxFQUFFO3dCQUNMLFlBQVk7d0JBQ1osaUJBQWlCO3dCQUNqQixzQkFBc0I7d0JBQ3RCLFNBQVM7d0JBQ1QsZUFBZTt3QkFDZixjQUFjO3dCQUNkLGtCQUFrQjtxQkFDckI7b0JBQ0QsT0FBTyxFQUFFO3dCQUNMLHlCQUF5QjtxQkFDNUI7b0JBQ0QsWUFBWSxFQUFFO3dCQUNWLHFCQUFxQjt3QkFDckIseUJBQXlCO3FCQUM1QjtvQkFDRCxlQUFlLEVBQUU7d0JBQ2IscUJBQXFCO3dCQUNyQix5QkFBeUI7cUJBQzVCO29CQUNELFNBQVMsRUFBRSxFQUFFO2lCQUNoQjs7OztnQkF4Qk8sYUFBYTs7SUFtQ3JCLDZCQUFDO0NBQUEsQUFqQ0QsSUFpQ0M7U0FWWSxzQkFBc0I7Ozs7OztJQUNuQiwrQ0FBb0MiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0NvbW1vbk1vZHVsZX0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7TmdNb2R1bGV9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtTdGlja3lNb2RhbE1vZHVsZX0gZnJvbSAnbmd4LXN0aWNreS1tb2RhbCc7XG5pbXBvcnQge1ZpZGVvQnJpY2tUZXh0UmVwcmVzZW50YXRpb25DbGFzc30gZnJvbSAnLi4vdmlkZW8tYnJpY2svdmlkZW8tYnJpY2stdGV4dC1yZXByZXNlbnRhdGlvbi5jbGFzcyc7XG5pbXBvcnQge0lucHV0Q29udGV4dENvbXBvbmVudH0gZnJvbSAnLi9pbnB1dC1jb250ZXh0L2lucHV0LWNvbnRleHQuY29tcG9uZW50JztcbmltcG9ydCB7V2ViQm9va21hcmtCcmlja0NvbXBvbmVudH0gZnJvbSAnLi9jb21wb25lbnQvd2ViLWJvb2ttYXJrLWJyaWNrLmNvbXBvbmVudCc7XG5pbXBvcnQge01hdEJ1dHRvbk1vZHVsZSwgTWF0Rm9ybUZpZWxkTW9kdWxlLCBNYXRJbnB1dE1vZHVsZX0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwnO1xuaW1wb3J0IHtUb3dNb2R1bGV9IGZyb20gJy4uLy4uL21vZHVsZXMvdG93L3Rvdy5tb2R1bGUnO1xuaW1wb3J0IHtIZWxwZXJDb21wb25lbnRzTW9kdWxlfSBmcm9tICcuLi8uLi9tb2R1bGVzL2hlbHBlci1jb21wb25lbnRzL2hlbHBlci1jb21wb25lbnRzLm1vZHVsZSc7XG5pbXBvcnQge0JyaWNrUmVnaXN0cnl9IGZyb20gJy4uLy4uL3dhbGwvcmVnaXN0cnkvYnJpY2stcmVnaXN0cnkuc2VydmljZSc7XG5cbkBOZ01vZHVsZSh7XG4gICAgaW1wb3J0czogW1xuICAgICAgICBDb21tb25Nb2R1bGUsXG4gICAgICAgIFN0aWNreU1vZGFsTW9kdWxlLFxuICAgICAgICBIZWxwZXJDb21wb25lbnRzTW9kdWxlLFxuICAgICAgICBUb3dNb2R1bGUsXG4gICAgICAgIE1hdEJ1dHRvbk1vZHVsZSxcbiAgICAgICAgTWF0SW5wdXRNb2R1bGUsXG4gICAgICAgIE1hdEZvcm1GaWVsZE1vZHVsZVxuICAgIF0sXG4gICAgZXhwb3J0czogW1xuICAgICAgICBXZWJCb29rbWFya0JyaWNrQ29tcG9uZW50XG4gICAgXSxcbiAgICBkZWNsYXJhdGlvbnM6IFtcbiAgICAgICAgSW5wdXRDb250ZXh0Q29tcG9uZW50LFxuICAgICAgICBXZWJCb29rbWFya0JyaWNrQ29tcG9uZW50XG4gICAgXSxcbiAgICBlbnRyeUNvbXBvbmVudHM6IFtcbiAgICAgICAgSW5wdXRDb250ZXh0Q29tcG9uZW50LFxuICAgICAgICBXZWJCb29rbWFya0JyaWNrQ29tcG9uZW50XG4gICAgXSxcbiAgICBwcm92aWRlcnM6IFtdXG59KVxuZXhwb3J0IGNsYXNzIFdlYkJvb2ttYXJrQnJpY2tNb2R1bGUge1xuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgYnJpY2tSZWdpc3RyeTogQnJpY2tSZWdpc3RyeSkge1xuICAgICAgICB0aGlzLmJyaWNrUmVnaXN0cnkucmVnaXN0ZXIoe1xuICAgICAgICAgICAgdGFnOiAnd2ViYm9va21hcmsnLFxuICAgICAgICAgICAgY29tcG9uZW50OiBXZWJCb29rbWFya0JyaWNrQ29tcG9uZW50LFxuICAgICAgICAgICAgdGV4dFJlcHJlc2VudGF0aW9uOiBWaWRlb0JyaWNrVGV4dFJlcHJlc2VudGF0aW9uQ2xhc3MsXG4gICAgICAgICAgICBuYW1lOiAnV2ViIEJvb2ttYXJrJyxcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiAnU2F2ZSBhIGxpbmsgYXMgYSB2aXN1YWwgYm9va21hcmsnXG4gICAgICAgIH0pO1xuICAgIH1cbn1cbiJdfQ==