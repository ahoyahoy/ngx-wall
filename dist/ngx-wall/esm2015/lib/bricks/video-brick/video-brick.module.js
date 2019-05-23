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
export class VideoBrickModule {
    /**
     * @param {?} brickRegistry
     */
    constructor(brickRegistry) {
        this.brickRegistry = brickRegistry;
        this.brickRegistry.register({
            tag: 'video',
            component: VideoBrickComponent,
            textRepresentation: VideoBrickTextRepresentationClass,
            name: 'Video',
            description: 'Embed from Youtube and more'
        });
    }
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
VideoBrickModule.ctorParameters = () => [
    { type: BrickRegistry }
];
if (false) {
    /**
     * @type {?}
     * @private
     */
    VideoBrickModule.prototype.brickRegistry;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmlkZW8tYnJpY2subW9kdWxlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LXdhbGwvIiwic291cmNlcyI6WyJsaWIvYnJpY2tzL3ZpZGVvLWJyaWNrL3ZpZGVvLWJyaWNrLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFDLFlBQVksRUFBQyxNQUFNLGlCQUFpQixDQUFDO0FBQzdDLE9BQU8sRUFBQyxRQUFRLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDdkMsT0FBTyxFQUFDLGlCQUFpQixFQUFDLE1BQU0sa0JBQWtCLENBQUM7QUFDbkQsT0FBTyxFQUFDLHFCQUFxQixFQUFDLE1BQU0seUNBQXlDLENBQUM7QUFDOUUsT0FBTyxFQUFDLG1CQUFtQixFQUFDLE1BQU0sbUNBQW1DLENBQUM7QUFDdEUsT0FBTyxFQUFDLGlDQUFpQyxFQUFDLE1BQU0seUNBQXlDLENBQUM7QUFDMUYsT0FBTyxFQUFDLGVBQWUsRUFBRSxrQkFBa0IsRUFBRSxjQUFjLEVBQUMsTUFBTSxtQkFBbUIsQ0FBQztBQUN0RixPQUFPLEVBQUMsc0JBQXNCLEVBQUMsTUFBTSwwREFBMEQsQ0FBQztBQUNoRyxPQUFPLEVBQUMsYUFBYSxFQUFDLE1BQU0sNENBQTRDLENBQUM7QUFlekUsTUFBTSxPQUFPLGdCQUFnQjs7OztJQUN6QixZQUFvQixhQUE0QjtRQUE1QixrQkFBYSxHQUFiLGFBQWEsQ0FBZTtRQUM1QyxJQUFJLENBQUMsYUFBYSxDQUFDLFFBQVEsQ0FBQztZQUN4QixHQUFHLEVBQUUsT0FBTztZQUNaLFNBQVMsRUFBRSxtQkFBbUI7WUFDOUIsa0JBQWtCLEVBQUUsaUNBQWlDO1lBQ3JELElBQUksRUFBRSxPQUFPO1lBQ2IsV0FBVyxFQUFFLDZCQUE2QjtTQUM3QyxDQUFDLENBQUM7SUFDUCxDQUFDOzs7WUF0QkosUUFBUSxTQUFDO2dCQUNOLE9BQU8sRUFBRTtvQkFDTCxZQUFZO29CQUNaLGlCQUFpQjtvQkFDakIsc0JBQXNCO29CQUN0QixlQUFlO29CQUNmLGNBQWM7b0JBQ2Qsa0JBQWtCO2lCQUNyQjtnQkFDRCxPQUFPLEVBQUUsQ0FBQyxtQkFBbUIsQ0FBQztnQkFDOUIsWUFBWSxFQUFFLENBQUMsbUJBQW1CLEVBQUUscUJBQXFCLENBQUM7Z0JBQzFELGVBQWUsRUFBRSxDQUFDLG1CQUFtQixFQUFFLHFCQUFxQixDQUFDO2FBQ2hFOzs7O1lBZE8sYUFBYTs7Ozs7OztJQWdCTCx5Q0FBb0MiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0NvbW1vbk1vZHVsZX0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7TmdNb2R1bGV9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtTdGlja3lNb2RhbE1vZHVsZX0gZnJvbSAnbmd4LXN0aWNreS1tb2RhbCc7XG5pbXBvcnQge0lucHV0Q29udGV4dENvbXBvbmVudH0gZnJvbSAnLi9pbnB1dC1jb250ZXh0L2lucHV0LWNvbnRleHQuY29tcG9uZW50JztcbmltcG9ydCB7VmlkZW9Ccmlja0NvbXBvbmVudH0gZnJvbSAnLi9jb21wb25lbnQvdmlkZW8tYnJpY2suY29tcG9uZW50JztcbmltcG9ydCB7VmlkZW9Ccmlja1RleHRSZXByZXNlbnRhdGlvbkNsYXNzfSBmcm9tICcuL3ZpZGVvLWJyaWNrLXRleHQtcmVwcmVzZW50YXRpb24uY2xhc3MnO1xuaW1wb3J0IHtNYXRCdXR0b25Nb2R1bGUsIE1hdEZvcm1GaWVsZE1vZHVsZSwgTWF0SW5wdXRNb2R1bGV9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsJztcbmltcG9ydCB7SGVscGVyQ29tcG9uZW50c01vZHVsZX0gZnJvbSAnLi4vLi4vbW9kdWxlcy9oZWxwZXItY29tcG9uZW50cy9oZWxwZXItY29tcG9uZW50cy5tb2R1bGUnO1xuaW1wb3J0IHtCcmlja1JlZ2lzdHJ5fSBmcm9tICcuLi8uLi93YWxsL3JlZ2lzdHJ5L2JyaWNrLXJlZ2lzdHJ5LnNlcnZpY2UnO1xuXG5ATmdNb2R1bGUoe1xuICAgIGltcG9ydHM6IFtcbiAgICAgICAgQ29tbW9uTW9kdWxlLFxuICAgICAgICBTdGlja3lNb2RhbE1vZHVsZSxcbiAgICAgICAgSGVscGVyQ29tcG9uZW50c01vZHVsZSxcbiAgICAgICAgTWF0QnV0dG9uTW9kdWxlLFxuICAgICAgICBNYXRJbnB1dE1vZHVsZSxcbiAgICAgICAgTWF0Rm9ybUZpZWxkTW9kdWxlXG4gICAgXSxcbiAgICBleHBvcnRzOiBbVmlkZW9Ccmlja0NvbXBvbmVudF0sXG4gICAgZGVjbGFyYXRpb25zOiBbVmlkZW9Ccmlja0NvbXBvbmVudCwgSW5wdXRDb250ZXh0Q29tcG9uZW50XSxcbiAgICBlbnRyeUNvbXBvbmVudHM6IFtWaWRlb0JyaWNrQ29tcG9uZW50LCBJbnB1dENvbnRleHRDb21wb25lbnRdXG59KVxuZXhwb3J0IGNsYXNzIFZpZGVvQnJpY2tNb2R1bGUge1xuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgYnJpY2tSZWdpc3RyeTogQnJpY2tSZWdpc3RyeSkge1xuICAgICAgICB0aGlzLmJyaWNrUmVnaXN0cnkucmVnaXN0ZXIoe1xuICAgICAgICAgICAgdGFnOiAndmlkZW8nLFxuICAgICAgICAgICAgY29tcG9uZW50OiBWaWRlb0JyaWNrQ29tcG9uZW50LFxuICAgICAgICAgICAgdGV4dFJlcHJlc2VudGF0aW9uOiBWaWRlb0JyaWNrVGV4dFJlcHJlc2VudGF0aW9uQ2xhc3MsXG4gICAgICAgICAgICBuYW1lOiAnVmlkZW8nLFxuICAgICAgICAgICAgZGVzY3JpcHRpb246ICdFbWJlZCBmcm9tIFlvdXR1YmUgYW5kIG1vcmUnXG4gICAgICAgIH0pO1xuICAgIH1cbn1cbiJdfQ==