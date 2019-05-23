/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { NgModule } from '@angular/core';
import { BrickRegistry } from '../../wall/wall';
import { DividerBrickComponent } from './component/divider-brick.component';
import { DIVIDER_BRICK_TAG } from './divider-brick.constant';
export class DividerBrickModule {
    /**
     * @param {?} brickRegistry
     */
    constructor(brickRegistry) {
        this.brickRegistry = brickRegistry;
        this.brickRegistry.register({
            tag: DIVIDER_BRICK_TAG,
            component: DividerBrickComponent,
            name: 'Divider',
            description: 'Visually divide blocks'
        });
    }
}
DividerBrickModule.decorators = [
    { type: NgModule, args: [{
                exports: [DividerBrickComponent],
                declarations: [DividerBrickComponent],
                entryComponents: [DividerBrickComponent]
            },] }
];
/** @nocollapse */
DividerBrickModule.ctorParameters = () => [
    { type: BrickRegistry }
];
if (false) {
    /**
     * @type {?}
     * @private
     */
    DividerBrickModule.prototype.brickRegistry;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGl2aWRlci1icmljay5tb2R1bGUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3gtd2FsbC8iLCJzb3VyY2VzIjpbImxpYi9icmlja3MvZGl2aWRlci1icmljay9kaXZpZGVyLWJyaWNrLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFDLFFBQVEsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUN2QyxPQUFPLEVBQUMsYUFBYSxFQUFDLE1BQU0saUJBQWlCLENBQUM7QUFDOUMsT0FBTyxFQUFDLHFCQUFxQixFQUFDLE1BQU0scUNBQXFDLENBQUM7QUFDMUUsT0FBTyxFQUFDLGlCQUFpQixFQUFDLE1BQU0sMEJBQTBCLENBQUM7QUFPM0QsTUFBTSxPQUFPLGtCQUFrQjs7OztJQUMzQixZQUFvQixhQUE0QjtRQUE1QixrQkFBYSxHQUFiLGFBQWEsQ0FBZTtRQUM1QyxJQUFJLENBQUMsYUFBYSxDQUFDLFFBQVEsQ0FBQztZQUN4QixHQUFHLEVBQUUsaUJBQWlCO1lBQ3RCLFNBQVMsRUFBRSxxQkFBcUI7WUFDaEMsSUFBSSxFQUFFLFNBQVM7WUFDZixXQUFXLEVBQUUsd0JBQXdCO1NBQ3hDLENBQUMsQ0FBQztJQUNQLENBQUM7OztZQWJKLFFBQVEsU0FBQztnQkFDTixPQUFPLEVBQUUsQ0FBQyxxQkFBcUIsQ0FBQztnQkFDaEMsWUFBWSxFQUFFLENBQUMscUJBQXFCLENBQUM7Z0JBQ3JDLGVBQWUsRUFBRSxDQUFDLHFCQUFxQixDQUFDO2FBQzNDOzs7O1lBUk8sYUFBYTs7Ozs7OztJQVVMLDJDQUFvQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7TmdNb2R1bGV9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtCcmlja1JlZ2lzdHJ5fSBmcm9tICcuLi8uLi93YWxsL3dhbGwnO1xuaW1wb3J0IHtEaXZpZGVyQnJpY2tDb21wb25lbnR9IGZyb20gJy4vY29tcG9uZW50L2RpdmlkZXItYnJpY2suY29tcG9uZW50JztcbmltcG9ydCB7RElWSURFUl9CUklDS19UQUd9IGZyb20gJy4vZGl2aWRlci1icmljay5jb25zdGFudCc7XG5cbkBOZ01vZHVsZSh7XG4gICAgZXhwb3J0czogW0RpdmlkZXJCcmlja0NvbXBvbmVudF0sXG4gICAgZGVjbGFyYXRpb25zOiBbRGl2aWRlckJyaWNrQ29tcG9uZW50XSxcbiAgICBlbnRyeUNvbXBvbmVudHM6IFtEaXZpZGVyQnJpY2tDb21wb25lbnRdXG59KVxuZXhwb3J0IGNsYXNzIERpdmlkZXJCcmlja01vZHVsZSB7XG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBicmlja1JlZ2lzdHJ5OiBCcmlja1JlZ2lzdHJ5KSB7XG4gICAgICAgIHRoaXMuYnJpY2tSZWdpc3RyeS5yZWdpc3Rlcih7XG4gICAgICAgICAgICB0YWc6IERJVklERVJfQlJJQ0tfVEFHLFxuICAgICAgICAgICAgY29tcG9uZW50OiBEaXZpZGVyQnJpY2tDb21wb25lbnQsXG4gICAgICAgICAgICBuYW1lOiAnRGl2aWRlcicsXG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogJ1Zpc3VhbGx5IGRpdmlkZSBibG9ja3MnXG4gICAgICAgIH0pO1xuICAgIH1cbn1cbiJdfQ==