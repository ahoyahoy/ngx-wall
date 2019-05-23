/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { NgModule } from '@angular/core';
import { BrickRegistry } from '../../wall/wall';
import { DividerBrickComponent } from './component/divider-brick.component';
import { DIVIDER_BRICK_TAG } from './divider-brick.constant';
var DividerBrickModule = /** @class */ (function () {
    function DividerBrickModule(brickRegistry) {
        this.brickRegistry = brickRegistry;
        this.brickRegistry.register({
            tag: DIVIDER_BRICK_TAG,
            component: DividerBrickComponent,
            name: 'Divider',
            description: 'Visually divide blocks'
        });
    }
    DividerBrickModule.decorators = [
        { type: NgModule, args: [{
                    exports: [DividerBrickComponent],
                    declarations: [DividerBrickComponent],
                    entryComponents: [DividerBrickComponent]
                },] }
    ];
    /** @nocollapse */
    DividerBrickModule.ctorParameters = function () { return [
        { type: BrickRegistry }
    ]; };
    return DividerBrickModule;
}());
export { DividerBrickModule };
if (false) {
    /**
     * @type {?}
     * @private
     */
    DividerBrickModule.prototype.brickRegistry;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGl2aWRlci1icmljay5tb2R1bGUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3gtd2FsbC8iLCJzb3VyY2VzIjpbImxpYi9icmlja3MvZGl2aWRlci1icmljay9kaXZpZGVyLWJyaWNrLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFDLFFBQVEsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUN2QyxPQUFPLEVBQUMsYUFBYSxFQUFDLE1BQU0saUJBQWlCLENBQUM7QUFDOUMsT0FBTyxFQUFDLHFCQUFxQixFQUFDLE1BQU0scUNBQXFDLENBQUM7QUFDMUUsT0FBTyxFQUFDLGlCQUFpQixFQUFDLE1BQU0sMEJBQTBCLENBQUM7QUFFM0Q7SUFNSSw0QkFBb0IsYUFBNEI7UUFBNUIsa0JBQWEsR0FBYixhQUFhLENBQWU7UUFDNUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxRQUFRLENBQUM7WUFDeEIsR0FBRyxFQUFFLGlCQUFpQjtZQUN0QixTQUFTLEVBQUUscUJBQXFCO1lBQ2hDLElBQUksRUFBRSxTQUFTO1lBQ2YsV0FBVyxFQUFFLHdCQUF3QjtTQUN4QyxDQUFDLENBQUM7SUFDUCxDQUFDOztnQkFiSixRQUFRLFNBQUM7b0JBQ04sT0FBTyxFQUFFLENBQUMscUJBQXFCLENBQUM7b0JBQ2hDLFlBQVksRUFBRSxDQUFDLHFCQUFxQixDQUFDO29CQUNyQyxlQUFlLEVBQUUsQ0FBQyxxQkFBcUIsQ0FBQztpQkFDM0M7Ozs7Z0JBUk8sYUFBYTs7SUFrQnJCLHlCQUFDO0NBQUEsQUFkRCxJQWNDO1NBVFksa0JBQWtCOzs7Ozs7SUFDZiwyQ0FBb0MiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge05nTW9kdWxlfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7QnJpY2tSZWdpc3RyeX0gZnJvbSAnLi4vLi4vd2FsbC93YWxsJztcbmltcG9ydCB7RGl2aWRlckJyaWNrQ29tcG9uZW50fSBmcm9tICcuL2NvbXBvbmVudC9kaXZpZGVyLWJyaWNrLmNvbXBvbmVudCc7XG5pbXBvcnQge0RJVklERVJfQlJJQ0tfVEFHfSBmcm9tICcuL2RpdmlkZXItYnJpY2suY29uc3RhbnQnO1xuXG5ATmdNb2R1bGUoe1xuICAgIGV4cG9ydHM6IFtEaXZpZGVyQnJpY2tDb21wb25lbnRdLFxuICAgIGRlY2xhcmF0aW9uczogW0RpdmlkZXJCcmlja0NvbXBvbmVudF0sXG4gICAgZW50cnlDb21wb25lbnRzOiBbRGl2aWRlckJyaWNrQ29tcG9uZW50XVxufSlcbmV4cG9ydCBjbGFzcyBEaXZpZGVyQnJpY2tNb2R1bGUge1xuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgYnJpY2tSZWdpc3RyeTogQnJpY2tSZWdpc3RyeSkge1xuICAgICAgICB0aGlzLmJyaWNrUmVnaXN0cnkucmVnaXN0ZXIoe1xuICAgICAgICAgICAgdGFnOiBESVZJREVSX0JSSUNLX1RBRyxcbiAgICAgICAgICAgIGNvbXBvbmVudDogRGl2aWRlckJyaWNrQ29tcG9uZW50LFxuICAgICAgICAgICAgbmFtZTogJ0RpdmlkZXInLFxuICAgICAgICAgICAgZGVzY3JpcHRpb246ICdWaXN1YWxseSBkaXZpZGUgYmxvY2tzJ1xuICAgICAgICB9KTtcbiAgICB9XG59XG4iXX0=