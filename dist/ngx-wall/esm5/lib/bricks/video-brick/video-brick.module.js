/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { StickyModalModule } from 'ngx-sticky-modal';
import { InputContextComponent } from './input-context/input-context.component';
import { VideoBrickComponent } from './component/video-brick.component';
import { VideoBrickTextRepresentationClass } from './video-brick-text-representation.class';
import { MatButtonModule, MatFormFieldModule, MatInputModule } from '@angular/material';
import { HelperComponentsModule } from '../../modules/helper-components/helper-components.module';
import { BrickRegistry } from '../../wall/registry/brick-registry.service';
var VideoBrickModule = /** @class */ (function () {
    function VideoBrickModule(brickRegistry) {
        this.brickRegistry = brickRegistry;
        this.brickRegistry.register({
            tag: 'video',
            component: VideoBrickComponent,
            textRepresentation: VideoBrickTextRepresentationClass,
            name: 'Video',
            description: 'Embed from Youtube and more'
        });
    }
    VideoBrickModule.decorators = [
        { type: NgModule, args: [{
                    imports: [
                        CommonModule,
                        StickyModalModule,
                        HelperComponentsModule,
                        MatButtonModule,
                        MatInputModule,
                        MatFormFieldModule
                    ],
                    exports: [VideoBrickComponent],
                    declarations: [VideoBrickComponent, InputContextComponent],
                    entryComponents: [VideoBrickComponent, InputContextComponent]
                },] }
    ];
    /** @nocollapse */
    VideoBrickModule.ctorParameters = function () { return [
        { type: BrickRegistry }
    ]; };
    return VideoBrickModule;
}());
export { VideoBrickModule };
if (false) {
    /**
     * @type {?}
     * @private
     */
    VideoBrickModule.prototype.brickRegistry;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmlkZW8tYnJpY2subW9kdWxlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LXdhbGwvIiwic291cmNlcyI6WyJsaWIvYnJpY2tzL3ZpZGVvLWJyaWNrL3ZpZGVvLWJyaWNrLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFDLFlBQVksRUFBQyxNQUFNLGlCQUFpQixDQUFDO0FBQzdDLE9BQU8sRUFBQyxRQUFRLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDdkMsT0FBTyxFQUFDLGlCQUFpQixFQUFDLE1BQU0sa0JBQWtCLENBQUM7QUFDbkQsT0FBTyxFQUFDLHFCQUFxQixFQUFDLE1BQU0seUNBQXlDLENBQUM7QUFDOUUsT0FBTyxFQUFDLG1CQUFtQixFQUFDLE1BQU0sbUNBQW1DLENBQUM7QUFDdEUsT0FBTyxFQUFDLGlDQUFpQyxFQUFDLE1BQU0seUNBQXlDLENBQUM7QUFDMUYsT0FBTyxFQUFDLGVBQWUsRUFBRSxrQkFBa0IsRUFBRSxjQUFjLEVBQUMsTUFBTSxtQkFBbUIsQ0FBQztBQUN0RixPQUFPLEVBQUMsc0JBQXNCLEVBQUMsTUFBTSwwREFBMEQsQ0FBQztBQUNoRyxPQUFPLEVBQUMsYUFBYSxFQUFDLE1BQU0sNENBQTRDLENBQUM7QUFFekU7SUFjSSwwQkFBb0IsYUFBNEI7UUFBNUIsa0JBQWEsR0FBYixhQUFhLENBQWU7UUFDNUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxRQUFRLENBQUM7WUFDeEIsR0FBRyxFQUFFLE9BQU87WUFDWixTQUFTLEVBQUUsbUJBQW1CO1lBQzlCLGtCQUFrQixFQUFFLGlDQUFpQztZQUNyRCxJQUFJLEVBQUUsT0FBTztZQUNiLFdBQVcsRUFBRSw2QkFBNkI7U0FDN0MsQ0FBQyxDQUFDO0lBQ1AsQ0FBQzs7Z0JBdEJKLFFBQVEsU0FBQztvQkFDTixPQUFPLEVBQUU7d0JBQ0wsWUFBWTt3QkFDWixpQkFBaUI7d0JBQ2pCLHNCQUFzQjt3QkFDdEIsZUFBZTt3QkFDZixjQUFjO3dCQUNkLGtCQUFrQjtxQkFDckI7b0JBQ0QsT0FBTyxFQUFFLENBQUMsbUJBQW1CLENBQUM7b0JBQzlCLFlBQVksRUFBRSxDQUFDLG1CQUFtQixFQUFFLHFCQUFxQixDQUFDO29CQUMxRCxlQUFlLEVBQUUsQ0FBQyxtQkFBbUIsRUFBRSxxQkFBcUIsQ0FBQztpQkFDaEU7Ozs7Z0JBZE8sYUFBYTs7SUF5QnJCLHVCQUFDO0NBQUEsQUF2QkQsSUF1QkM7U0FWWSxnQkFBZ0I7Ozs7OztJQUNiLHlDQUFvQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7Q29tbW9uTW9kdWxlfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHtOZ01vZHVsZX0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge1N0aWNreU1vZGFsTW9kdWxlfSBmcm9tICduZ3gtc3RpY2t5LW1vZGFsJztcbmltcG9ydCB7SW5wdXRDb250ZXh0Q29tcG9uZW50fSBmcm9tICcuL2lucHV0LWNvbnRleHQvaW5wdXQtY29udGV4dC5jb21wb25lbnQnO1xuaW1wb3J0IHtWaWRlb0JyaWNrQ29tcG9uZW50fSBmcm9tICcuL2NvbXBvbmVudC92aWRlby1icmljay5jb21wb25lbnQnO1xuaW1wb3J0IHtWaWRlb0JyaWNrVGV4dFJlcHJlc2VudGF0aW9uQ2xhc3N9IGZyb20gJy4vdmlkZW8tYnJpY2stdGV4dC1yZXByZXNlbnRhdGlvbi5jbGFzcyc7XG5pbXBvcnQge01hdEJ1dHRvbk1vZHVsZSwgTWF0Rm9ybUZpZWxkTW9kdWxlLCBNYXRJbnB1dE1vZHVsZX0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwnO1xuaW1wb3J0IHtIZWxwZXJDb21wb25lbnRzTW9kdWxlfSBmcm9tICcuLi8uLi9tb2R1bGVzL2hlbHBlci1jb21wb25lbnRzL2hlbHBlci1jb21wb25lbnRzLm1vZHVsZSc7XG5pbXBvcnQge0JyaWNrUmVnaXN0cnl9IGZyb20gJy4uLy4uL3dhbGwvcmVnaXN0cnkvYnJpY2stcmVnaXN0cnkuc2VydmljZSc7XG5cbkBOZ01vZHVsZSh7XG4gICAgaW1wb3J0czogW1xuICAgICAgICBDb21tb25Nb2R1bGUsXG4gICAgICAgIFN0aWNreU1vZGFsTW9kdWxlLFxuICAgICAgICBIZWxwZXJDb21wb25lbnRzTW9kdWxlLFxuICAgICAgICBNYXRCdXR0b25Nb2R1bGUsXG4gICAgICAgIE1hdElucHV0TW9kdWxlLFxuICAgICAgICBNYXRGb3JtRmllbGRNb2R1bGVcbiAgICBdLFxuICAgIGV4cG9ydHM6IFtWaWRlb0JyaWNrQ29tcG9uZW50XSxcbiAgICBkZWNsYXJhdGlvbnM6IFtWaWRlb0JyaWNrQ29tcG9uZW50LCBJbnB1dENvbnRleHRDb21wb25lbnRdLFxuICAgIGVudHJ5Q29tcG9uZW50czogW1ZpZGVvQnJpY2tDb21wb25lbnQsIElucHV0Q29udGV4dENvbXBvbmVudF1cbn0pXG5leHBvcnQgY2xhc3MgVmlkZW9Ccmlja01vZHVsZSB7XG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBicmlja1JlZ2lzdHJ5OiBCcmlja1JlZ2lzdHJ5KSB7XG4gICAgICAgIHRoaXMuYnJpY2tSZWdpc3RyeS5yZWdpc3Rlcih7XG4gICAgICAgICAgICB0YWc6ICd2aWRlbycsXG4gICAgICAgICAgICBjb21wb25lbnQ6IFZpZGVvQnJpY2tDb21wb25lbnQsXG4gICAgICAgICAgICB0ZXh0UmVwcmVzZW50YXRpb246IFZpZGVvQnJpY2tUZXh0UmVwcmVzZW50YXRpb25DbGFzcyxcbiAgICAgICAgICAgIG5hbWU6ICdWaWRlbycsXG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogJ0VtYmVkIGZyb20gWW91dHViZSBhbmQgbW9yZSdcbiAgICAgICAgfSk7XG4gICAgfVxufVxuIl19